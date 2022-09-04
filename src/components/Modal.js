import React from 'react';
import './Modal.css';

export default function ModalPayer({children}) {
  return (
    <div className='mod-container '>
      <div className='mod-content'>
        {children}
      </div>
    </div>
  )
}
