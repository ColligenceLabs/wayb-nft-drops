import React from 'react';
import ReactModal from 'react-modal';
const DialogWallets = (show, onHide) => {
  return (
    <ReactModal
      isOpen={show}
      contentLabel="onRequestClose Example"
      onRequestClose={onHide}
      className="Modal"
      overlayClassName="Overlay"
      style={{
        overlay: {
          backgroundColor: 'papayawhip',
        },
        content: {
          color: 'lightsteelblue',
        },
      }}
    >
      {/* <p>Modal text!</p> */}
    </ReactModal>
  );
};

export default DialogWallets;
