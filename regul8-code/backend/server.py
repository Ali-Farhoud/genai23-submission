
from operator import itemgetter
from typing import List, Tuple

from fastapi import FastAPI
from langchain.embeddings import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.prompts.prompt import PromptTemplate
from langchain.schema import format_document
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnableMap, RunnablePassthrough
from langchain.vectorstores import FAISS
from langchain.embeddings import AzureOpenAIEmbeddings
from langchain.chat_models import AzureChatOpenAI
from langchain.vectorstores import Chroma
from dotenv import load_dotenv
load_dotenv()

from langserve import add_routes
from langserve.pydantic_v1 import BaseModel, Field
import os 
persist_directory = os.environ.get('PERSIST_DIRECTORY')
TOP_K = 4

_TEMPLATE = """Given the following conversation and a follow up question, rephrase the 
follow up question to be a standalone question, in its original language.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:"""
CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_TEMPLATE)

ANSWER_TEMPLATE = """You are Regy AI a helpful, respectful, and honest Telecommunications Regulation assistant.
You are a tool that helps policymakers navigate regulations regarding connecting schools to the Internet. You comprehensively analyze the national regulatory landscape within the
telecommunication and connectivity sector and  provide insights into existing
regulations, identify gaps and offer recommendations for policy enhancements to
facilitate Giga's mission of connecting schools to the internet.
Use the provided context to answer the question only.  
When asked about a country provide its corresponding G5 benchmark value and score if present in the context.
Answer in a manner a policymaker would understand, keep it detailed, and use statistics and metrics.
Give the answer in a JSON format with ONLY keys `answer` and `country`.
The context is: 
{context}

Question: {question}"""

ANSWER_PROMPT = ChatPromptTemplate.from_template(ANSWER_TEMPLATE)

DEFAULT_DOCUMENT_PROMPT = PromptTemplate.from_template(template="{page_content}")


def _combine_documents(
    docs, document_prompt=DEFAULT_DOCUMENT_PROMPT, document_separator="\n\n"
):
    """Combine documents into a single string."""
    doc_strings = [format_document(doc, document_prompt) for doc in docs]
    return document_separator.join(doc_strings)


def _format_chat_history(chat_history: List[Tuple]) -> str:
    """Format chat history into a string."""
    buffer = ""
    for dialogue_turn in chat_history:
        human = "Human: " + dialogue_turn[0]
        ai = "Assistant: " + dialogue_turn[1]
        buffer += "\n" + "\n".join([human, ai])
    return buffer


# vectorstore = FAISS.from_texts(
#     ["harrison worked at kensho"], embedding=OpenAIEmbeddings()
# )
# retriever = vectorstore.as_retriever()
embeddings = AzureOpenAIEmbeddings(
azure_deployment="text-embedding-05",
openai_api_version="2023-05-15",
)
vectorstore = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": TOP_K})
llm = AzureChatOpenAI(
    openai_api_version="2023-05-15",
    azure_deployment="gpt-model-05",
)
_inputs = RunnableMap(
    standalone_question=RunnablePassthrough.assign(
        chat_history=lambda x: _format_chat_history(x["chat_history"])
    )
    | CONDENSE_QUESTION_PROMPT
    | llm
    | StrOutputParser(),
)
_context = {
    "context": itemgetter("standalone_question") | retriever | _combine_documents,
    "question": lambda x: x["standalone_question"],
}


# User input
class ChatHistory(BaseModel):
    """Chat history with the bot."""

    chat_history: List[Tuple[str, str]] = Field(
        ...,
        extra={"widget": {"type": "chat", "input": "question"}},
    )
    question: str


conversational_qa_chain = (
    _inputs | _context | ANSWER_PROMPT |llm| StrOutputParser()
)
chain = conversational_qa_chain.with_types(input_type=ChatHistory)

app = FastAPI(
    title="LangChain Server",
    version="1.0",
    description="Spin up a simple api server using Langchain's Runnable interfaces",
)
from fastapi.middleware.cors import CORSMiddleware
origins = ["http://localhost","http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Adds routes to the app for using the chain under:
# /invoke
# /batch
# /stream
add_routes(app, chain, enable_feedback_endpoint=True)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)