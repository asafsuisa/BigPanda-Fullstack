import React, { useState, useEffect } from 'react';
import { MessagesAPI } from 'utils/api/MessagesAPI';
import md5 from 'md5';
import './MessageItem.scss';
import { Dialog } from 'shared/Dialog/Dialog';
import * as moment from 'moment';

export function MessageItem({ email, message }) {

  const [md5Hash, setMd5Hash] = useState('');
  const [open, setOpen] = useState(false);
  const [lastActivate, setlastActivate] = useState('');

  useEffect(() => {
    setMd5Hash(md5(email));
  }, [email]);


  const togglePopUp = () => {
    if (!open) {
      MessagesAPI.getLastActivatedTime(email).then(res => {
        if (res && res.lastActive) {
          setlastActivate(res.lastActive);
        }
      })
    }
    setOpen(!open);
  }

  return (
    <div>
      <div className="message-item-container" >
        <div className="avatar" onClick={togglePopUp}>
          <img alt="gravatar" src={"https://www.gravatar.com/avatar/" + md5Hash} />
        </div>
        <div className="message-details">
          <div className="email">{email}</div>
          <div className="message-content">{message}</div>
        </div>
      </div>
      {!!open && <Dialog dialogTitle="User Details" closePopup={togglePopUp}>
        <div>
          <img alt="gravatar" src={"https://www.gravatar.com/avatar/" + md5Hash} />
        </div>
        <div className="details">
          <div className="email"><b>Email: </b>{email}</div>
          <div className="last-activate"><b>Last Activate: </b>{moment(lastActivate).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
      </Dialog>}
    </div>
  );
}
