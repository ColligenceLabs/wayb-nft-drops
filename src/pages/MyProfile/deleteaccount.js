import React from "react";

export default ({ close }) => (
    <div className="modal-delete-account">
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-box">
                    <div className="content">
                        <h1>Are you sure you want to permanently delete your account, all tokens associated with this account will be lost</h1>
                    </div>
                    <div className="action">
                        <button className="yes">Yes</button>
                        <button className="no" onClick={close}>No</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);