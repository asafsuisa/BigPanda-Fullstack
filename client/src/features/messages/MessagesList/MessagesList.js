import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  updateFilterValue,
  updateListAsync,
  selectMessagesList,
  selectMessagesFilter
} from 'features/messages/messagesSlice';
import { MessageItem } from './MessageItem/MessageItem';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash';

export function MessagesList() {
  const dispatch = useDispatch();
  const messagesList = useSelector(selectMessagesList, shallowEqual);
  const messageFilter = useSelector(selectMessagesFilter);

  const [debouncedUpdatedList] = useState(() => _.debounce(() => dispatch(updateListAsync()), 250));

  const handleFilterChanged = e => {
    dispatch(updateFilterValue(e.target.value));
    debouncedUpdatedList();
  }

  useEffect(() => {
    dispatch(updateListAsync());
  }, []);

  return (
    <div className="container">
      <div className="section">
        <div className="input-wrapper">
          <div className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input type="text" placeholder="Filter" value={messageFilter} onChange={handleFilterChanged} />
        </div>
      </div>
      <div className="messages-container">
        {messagesList.map(el => {
          return <MessageItem key={el._id} email={el.email} message={el.message} />
        })}
      </div>
    </div>
  );
}
