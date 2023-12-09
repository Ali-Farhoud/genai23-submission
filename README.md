This repo is our submission for QCRI Generative AI Hackathon 2023 ([website](https://genai23.qcri.org))


RegAI
====

Regul8
==
Ali Farhoud (alifarhoud613@gmail.com)
Fatima Tayab (fatimat@qmic.com)
Osama Muhammad Khalid (osamam@qmic.com)

Description

==
The system follows the RAG framework.
The system consists of the vector database generated from a huge number of scraped documents related to our application.
The embeddings were generated using OpenAI model "text-embedding-05" and stored locally in a vector store using ChromaDB.
The system uses a specialised prompt that fills in the context using data retreived from the vector store based on the user question.
This filled prompt is then forwarded to the LLM engine OpenAI "gpt-model-05" for final analysis and response.
The prompt is engineered to force the LLM to use only the context to provide the answer and to keep the answer as clear and consise as possible.
The prompt is also engineered to provide some extra information regarding the Internet Connectivity Penetration score of the specific country in question.
The system exposes the LLM pipeline using REST API to our frontend written in React.
The frontend allows the user to chat with the LLM as well as displaying relevent charts related to the data.


This repo is our submission for QCRI Generative AI Hackathon 2023 ([website](https://genai23.qcri.org))
