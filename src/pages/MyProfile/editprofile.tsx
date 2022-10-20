import React, { SetStateAction } from 'react';
import avatar from '../../assets/img/avatar.png';
import edit_blue from '../../assets/img/edit_blue.png';

type editprofileProps = {
  close: boolean | SetStateAction<any>;
};
const editprofile: any = (close: any) => (
  <div className="modal-editprofile">
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="edit-profile-modal-box">
          <div className="title">
            <div className="custom-title">Edit Profile</div>
            <button className="close" onClick={close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24.329 24.329"
              >
                <path
                  id="Path_84708"
                  data-name="Path 84708"
                  d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z"
                  transform="translate(-5 -5)"
                  fill="#fff"
                ></path>
              </svg>
            </button>
          </div>
          <div className="line line-edit-profile"></div>
          <form>
            <div className="form-content">
              <div className="content-box photo">
                <div className="avatar">
                  <img id="avatar_upload" src={avatar} alt="" />
                  <input type="file" id="file-upload" accept="image/*" />
                  <div className="icon-edit">
                    <img src={edit_blue} alt="icon edit" />
                  </div>
                </div>
              </div>
              <div className="content-box">
                <div className="content-title">Username</div>
                <input placeholder="Change Username" />
              </div>
              <div className="content-box">
                <div className="content-title">Email address</div>
                <input placeholder="Change Email" />
              </div>

              <button type="submit" className="">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
export default editprofile;
