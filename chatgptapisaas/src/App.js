

import React, { useState} from 'react';
import './App.css'


function App() {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message))
      .catch((error) => console.log("Fetching brought an error" + error))
  };

  return (
    <div className="App">
      <h2>Chat with an AI</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={ (e) => setMessage(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}


export default App
