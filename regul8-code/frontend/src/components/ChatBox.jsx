// ChatBox.js
import React, { useState } from 'react';
import './ChatBox.css';
import axios from 'axios';

const ChatBox = () => {

  const [messages, setMessages] = useState([ { text: "🤖: Hello There!, I am RegyAI Your assistant to navigate global telecom polices. Ask me about latest trends", type: 'received' }]);
  const [inputValue, setInputValue] = useState('');
  const [country, setCountry] = useState(null);
  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };
  const sendMessage = async () => {
    // Make axios post call and receive a text response
    
  
    // Make axios post call and receive a text response
    if (inputValue !== "") {
      const newSentMessage = { text: inputValue, type: 'sent' };
      const typingMessage = { text: "🤖: AI is typing...", type: 'received' };
      const newMessages = [...messages, newSentMessage, typingMessage];
      
      // Update UI with both sent and "AI is typing..." messages
      setMessages(newMessages);
      setInputValue('');
      try {
        const requestBody = {
          input: {
            question: inputValue,
            chat_history: [],
          },
        };
        const response = await axios.post("http://localhost:8000/invoke", requestBody);
        
        // Update UI with the received message after getting the response
        const answer = JSON.parse(response.data.output).answer
    
        const newReceivedMessage = { text: "🤖: "+ answer, type: 'received' };
        const updatedMessages = [...newMessages.slice(0, -1), newReceivedMessage]; // Replace "AI is typing..." with the actual response
      setMessages(updatedMessages);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };
  return (
    <div className='d-flex flex-column h-100 mh-100 main-chat'>
        <div className="chat-header bg-primary w-100 d-flex justify-content-center"> 
        <h3 className='text-light '>RegAI ChatBot 🤖 💬</h3>
        </div>

        <div className="chat-body bg-light w-100 mh-100 "> 
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type === 'sent' ? 'sent' : 'received'}`}>
            {message.text}
          </div>
        ))}
      </div>

        <div className="chat-footer  mt-auto mb-1">
        <input
        value={inputValue}
        onChange={handleUserInput}
              className='w-100 message-input p-2'
              type="text"
              placeholder="Type your message..." 
            />
            <button onClick={sendMessage} className='btn btn-success ms-auto' >Send</button>
        </div>
    </div>
  );
};

export default ChatBox;
