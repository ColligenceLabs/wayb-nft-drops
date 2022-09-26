import React from 'react';
import { Link } from 'react-router-dom';
import success_icon from '../../assets/img/success.png';
import test_collectibles from 'assets/img/collectibles_test.png';

type SuccessProps = {
  close: any;
};

const Success: React.FC<SuccessProps> = ({ close }) => (
  <div
    className="modal_collectibles"
    tabIndex={-1}
    role="dialog"
    aria-modal="true"
  >
    <div className="contents flex" data-qa-component="send-to-matic-modal-box">
      <div className="titles">
        <div className="title">
          <svg
            className="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g className="modal_svg_path" clipPath="url(#clip0_12_2773)">
              <path
                d="M16.0833 9.27079C15.7917 9.10413 15.4167 9.10413 15.0833 9.27079L12.75 10.6458L11.1667 11.5208L8.875 12.8958C8.58333 13.0625 8.20833 13.0625 7.875 12.8958L6.08333 11.8125C5.79167 11.6458 5.58333 11.3125 5.58333 10.9375V8.85413C5.58333 8.52079 5.75 8.18746 6.08333 7.97913L7.875 6.93746C8.16667 6.77079 8.54167 6.77079 8.875 6.93746L10.6667 8.02079C10.9583 8.18746 11.1667 8.52079 11.1667 8.89579V10.2708L12.75 9.35413V7.93746C12.75 7.60413 12.5833 7.27079 12.25 7.06246L8.91667 5.10413C8.625 4.93746 8.25 4.93746 7.91667 5.10413L4.5 7.10413C4.16667 7.27079 4 7.60413 4 7.93746V11.8541C4 12.1875 4.16667 12.5208 4.5 12.7291L7.875 14.6875C8.16667 14.8541 8.54167 14.8541 8.875 14.6875L11.1667 13.3541L12.75 12.4375L15.0417 11.1041C15.3333 10.9375 15.7083 10.9375 16.0417 11.1041L17.8333 12.1458C18.125 12.3125 18.3333 12.6458 18.3333 13.0208V15.1041C18.3333 15.4375 18.1667 15.7708 17.8333 15.9791L16.0833 17.0208C15.7917 17.1875 15.4167 17.1875 15.0833 17.0208L13.2917 15.9791C13 15.8125 12.7917 15.4791 12.7917 15.1041V13.7708L11.2083 14.6875V16.0625C11.2083 16.3958 11.375 16.7291 11.7083 16.9375L15.0833 18.8958C15.375 19.0625 15.75 19.0625 16.0833 18.8958L19.4583 16.9375C19.75 16.7708 19.9583 16.4375 19.9583 16.0625V12.1041C19.9583 11.7708 19.7917 11.4375 19.4583 11.2291L16.0833 9.27079Z"
                fill="#8247E5"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_12_2773">
                <rect
                  width="16"
                  height="13.9583"
                  fill="white"
                  transform="translate(4 5.02081)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          Send to Polygon Wallet
        </div>
        <div className="close_button">
          <button onClick={close} className="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24.329"
              height="24.329"
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
      </div>
      <div className="img_box">
        <img
          src={test_collectibles}
          data-qa-component="token-display-image"
          alt=""
        ></img>
      </div>
      <div className="success">
        Success
        <img src={success_icon} alt="" />
      </div>
      <div className="text_sending">
        <a className="purple_text">
          &nbsp;Strawberry Shortcake Space Creampop #49&nbsp;
        </a>
        is on its way to 0xF3e34e...f478670B20
      </div>
      {/* <hr size={1} width={'80%'} color={'#363433'}></hr> */}
      <hr style={{ fontSize: 1, width: '80%', color: '#363433' }}></hr>
      <div className="text_small">
        It may takes a few hours to show up in your interval wallet. Please
        email us at <a className="purple_text">support@sweet.io</a> if you have
        any question.
      </div>
      <div className="understand">
        <Link to={'/my-collectibles'} className="link">
          <button
            onClick={close}
            className="understand_button"
            data-qa-component="continue-button"
          >
            Go to My Wallet
          </button>
        </Link>
      </div>
    </div>
  </div>
);
export default Success;
