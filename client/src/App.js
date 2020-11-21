import React from 'react';
import { MessagesList } from './features/messages/MessagesList/MessagesList';
import { NewMessageForm } from './features/messages/NewMessage/NewMessage';
import './App.scss';
function App() {
  return (
    <div className="App">
      <NewMessageForm />
      <MessagesList />
    </div>
  );
}

export default App;
