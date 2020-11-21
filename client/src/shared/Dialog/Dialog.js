import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Dialog.scss';

export function Dialog({ dialogTitle, closePopup, children }) {

  return (
    <div className="dialog">
      <div className="dialog-popup">
        <div className="dialog-toolbar">
          <div className="title">{dialogTitle}</div>
          <button onClick={closePopup}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        {children ? <div className="dialog-body">{children}</div> : ''}
      </div>
    </div>
  );
}
