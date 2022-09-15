import React from 'react';
import ReactModal from 'react-modal';
const DialogWallets = (show, onHide) => {
  return (
    <ReactModal
      isOpen={true}
      contentLabel="onRequestClose Example"
      onRequestClose={undefined}
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
      <p>Modal text!</p>
      {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
    </ReactModal>
  );
};

export default DialogWallets;
