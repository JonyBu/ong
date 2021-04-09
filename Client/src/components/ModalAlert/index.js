import React from 'react';
import { useState } from 'react';

import Modal from './Modal';

const ModalAlert = ({ title, text, type, confirmButtonText, cancelButtonText, showCancelButton, showConfirmButton, onConfirm , textButton = 'alert' }) => {
 
  const [show, setShow] = useState(false);

  return (
    <>
      <button className="modal-alert-button" onClick={ () => setShow(true) }>{ textButton }</button>
      <Modal 
        title={title}
        text={text}
        type={type}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
        showCancelButton={showCancelButton} 
        showConfirmButton={showConfirmButton}       
        onConfirm={onConfirm}
        setShow={setShow} 
        show={show}       
      />
    </>
  ); 
}

export default ModalAlert;
