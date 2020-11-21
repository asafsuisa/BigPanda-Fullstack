import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { MessagesAPI } from 'utils/api/MessagesAPI';
import {
  updateListAsync
} from 'features/messages/messagesSlice';
import './NewMessage.scss';

export function NewMessageForm() {
  const dispatch = useDispatch();

  const [emailInput, setEmailInput] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    MessagesAPI.submitNewItem({ email: emailInput, message: messageInput }).then(res => {
      if (res) {
        dispatch(updateListAsync());
        resetForm();
      }
    });
  };

  const resetForm = () => {
    setEmailInput('');
    setMessageInput('');
  }

  return (
    <div className="container new-message-container">
      <form onSubmit={handleSubmit}>
        <div className="section">
          <input type="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
        </div>
        <div className="section">
          <textarea rows="3" placeholder="Message" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} required />
        </div>
        <div className="actions">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
