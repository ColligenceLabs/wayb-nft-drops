import React, { SetStateAction } from 'react';

type deleteaccountProps = {
  close: boolean | SetStateAction<any>;
};
const deleteaccount: React.FC<deleteaccountProps> = ({ close }) => (
  <div className="modal-delete-account">
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-box">
          <div className="content">
            <div>
              Are you sure you want to permanently delete your account, all
              tokens associated with this account will be lost
            </div>
          </div>
          <div className="action">
            <button className="yes">Yes</button>
            <button className="no" onClick={close}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default deleteaccount;
