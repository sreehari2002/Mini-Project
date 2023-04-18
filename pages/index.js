import { useEffect, useState } from 'react';

function ChatScreen({ name }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    async function fetchChatMessages() {
      const response = await fetch('/api/chat');
      const messages = await response.json();
      setChatMessages(messages);
    }
    fetchChatMessages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: newMessage })
    });
    const data = await response.json();
    setChatMessages([...chatMessages, { author: name, text: newMessage }]);
    setNewMessage('');

    // handle response from API
    const { prompt, response: aiResponse } = data;
    setChatMessages([...chatMessages, { author: "AI", text: prompt }]);
    setChatMessages([...chatMessages, { author: "AI", text: aiResponse }]);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 py-4 px-8">
        <h1 className="text-2xl text-white">Chat with {name}</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-scroll">
        {chatMessages.map((message, index) => (
          <div key={index} className="py-2">
            <p className="font-medium">{message.author}: {message.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="py-2 px-4 bg-gray-200 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Type your message here..."
          className="w-full border border-gray-400 rounded py-2 px-4 mr-2 text-black"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatScreen;
