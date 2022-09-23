import React from "react";
import Popup from 'reactjs-popup';
import SignupForm from "./signupForm";
import icon_ethereum from 'assets/img/icon_ethereum.png';
import icon_klaytn from 'assets/img/icon_klaytn.png';
import icon_solana from 'assets/img/icon_solana.png';
import icon_binance from 'assets/img/icon_binance.png';
import icon_talk from 'assets/img/icon_talk.png';
import icon_ethereum2 from 'assets/img/icon_ethereum2.png';
import icon_metamask from 'assets/img/icon_metamask.png';

const closeOnDocumentClick = false;
const overlayStyle = { background: 'rgba(0,0,0,0.0)' };

const LoginForm = ({ close }) => (
  <div className="login_form" tabIndex="-1" role="dialog" aria-modal="true">
    <div className="box-content">
      <div className="div-title">
        <div className="title">Log in</div>
        <button onClick={close} className="button-close">
          <svg className="sc-6c80924e-4 eTDRlh" xmlns="http://www.w3.org/2000/svg" width="24.329" height="24.329" viewBox="0 0 24.329 24.329">
            <path id="Path_84708" data-name="Path 84708" d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z" transform="translate(-5 -5)" fill="#fff"></path>
          </svg>
        </button>
      </div>
      <div>
        <div className="div-methods">Log in with one of these methods</div>
        <div className="methods">
          <button data-channel="apple" className="method-apple">
            <svg xmlns="http://www.w3.org/2000/svg" width="20.688" height="25.365" viewBox="0 0 20.688 25.365">
              <g id="Group_14385" data-name="Group 14385" transform="translate(0 0)">
                <path id="Path_10317" data-name="Path 10317" d="M356.758,622.364c-.121.106-.24.209-.357.315a9.148,9.148,0,0,0-1.242,1.31,5.1,5.1,0,0,0-1.035,2.656,5.747,5.747,0,0,0,1.962,4.943,3.534,3.534,0,0,0,1.339.767l.044.015c-.052.156-.1.31-.156.462a15.339,15.339,0,0,1-2.482,4.353A5.963,5.963,0,0,1,353.4,638.5a2.869,2.869,0,0,1-1.677.495,4.958,4.958,0,0,1-1.261-.243c-.452-.141-.9-.3-1.35-.44a5.648,5.648,0,0,0-1.474-.267,4.5,4.5,0,0,0-1.613.266c-.4.136-.789.3-1.186.439a4.794,4.794,0,0,1-1.171.278,2.815,2.815,0,0,1-1.533-.307,5.2,5.2,0,0,1-1.521-1.2,12.8,12.8,0,0,1-1.63-2.315,17.708,17.708,0,0,1-1.588-3.585,13.776,13.776,0,0,1-.509-2.333,12.547,12.547,0,0,1-.06-2.588,9.176,9.176,0,0,1,.665-2.864,6.825,6.825,0,0,1,1.955-2.677,4.851,4.851,0,0,1,2.4-1.065,6.368,6.368,0,0,1,1.969.039,19.513,19.513,0,0,1,2.047.5,8.982,8.982,0,0,0,1.3.281,2.669,2.669,0,0,0,.867-.073,14.477,14.477,0,0,0,1.61-.472,8.283,8.283,0,0,1,1.8-.418,5.438,5.438,0,0,1,4.275,1.308,8.669,8.669,0,0,1,1.016,1.057Z" transform="translate(-336.783 -613.676)" fill="#fff"></path>
                <path id="Path_10318" data-name="Path 10318" d="M1021.019,247.9c.012-.215.019-.42.037-.624.007-.079.015-.158.052-.442a6.1,6.1,0,0,1,.391-1.477,5.379,5.379,0,0,1,1.219-1.9,5.582,5.582,0,0,1,1.859-1.162,9.213,9.213,0,0,1,1.31-.4h0a1.718,1.718,0,0,1,.088.548,5.144,5.144,0,0,1-.312,1.77,6,6,0,0,1-2.375,3.082,3.232,3.232,0,0,1-1.451.514c-.24.029-.48.057-.721.085C1021.088,247.9,1021.062,247.9,1021.019,247.9Z" transform="translate(-1010.877 -241.898)" fill="#fff"></path>
              </g>
            </svg>
          </button>
          <button data-channel="twitter" className="method-twitter">
            <svg xmlns="http://www.w3.org/2000/svg" width="27.872" height="22.691" viewBox="0 0 27.872 22.691">
              <g id="nFfOKX.tif" transform="translate(0 0)">
                <g id="Group_14390" data-name="Group 14390">
                  <path id="Path_10341" data-name="Path 10341" d="M-1035.912-881.423h-.417a.047.047,0,0,0-.034-.012l-.443,0c-.253-.012-.506-.022-.758-.041q-.746-.056-1.484-.18a16.161,16.161,0,0,1-2.494-.626,16.176,16.176,0,0,1-3.472-1.654.179.179,0,0,1-.071-.059,11.457,11.457,0,0,0,4.452-.347,11.277,11.277,0,0,0,3.977-2.023,5.947,5.947,0,0,1-1.736-.318,5.693,5.693,0,0,1-1.56-.824,5.641,5.641,0,0,1-1.236-1.26,5.439,5.439,0,0,1-.78-1.579,5.637,5.637,0,0,0,2.538-.1,5.71,5.71,0,0,1-3.3-2.027A5.69,5.69,0,0,1-1044-896.14a5.616,5.616,0,0,0,2.576.708,5.878,5.878,0,0,1-1.514-1.509,5.672,5.672,0,0,1-.863-1.964,5.7,5.7,0,0,1-.084-2.136,5.7,5.7,0,0,1,.713-2.029,16.288,16.288,0,0,0,3.327,3.087,16.2,16.2,0,0,0,4.03,2.042,16.266,16.266,0,0,0,4.438.856.2.2,0,0,0-.007-.084,5.734,5.734,0,0,1-.112-1.65,5.529,5.529,0,0,1,.323-1.508,5.66,5.66,0,0,1,2.187-2.805,5.668,5.668,0,0,1,3.01-.979,5.6,5.6,0,0,1,1.419.13,5.7,5.7,0,0,1,1.923.808,5.62,5.62,0,0,1,.982.817.1.1,0,0,0,.1.037,11.619,11.619,0,0,0,1.869-.548,11.414,11.414,0,0,0,1.634-.786.117.117,0,0,1,.074-.028,5.827,5.827,0,0,1-2.474,3.137,11.176,11.176,0,0,0,3.222-.876c0,.012,0,.018,0,.021-.012.019-.024.038-.037.056a11.6,11.6,0,0,1-2.3,2.493c-.139.112-.279.224-.425.326a.135.135,0,0,0-.071.146,2.136,2.136,0,0,1,.009.253,15.973,15.973,0,0,1-.1,2.147q-.075.654-.2,1.3a17.054,17.054,0,0,1-.658,2.4,17.067,17.067,0,0,1-1.421,3.034,16.378,16.378,0,0,1-2.517,3.244,15.5,15.5,0,0,1-2.725,2.171,15.287,15.287,0,0,1-2.939,1.428,15.921,15.921,0,0,1-2.074.59q-.7.15-1.408.238c-.367.045-.735.081-1.1.1-.223.013-.446.024-.669.031A.107.107,0,0,0-1035.912-881.423Z" transform="translate(1045.085 904.114)" fill="#fff"></path>
                  <path id="Path_10342" data-name="Path 10342" d="M-211.526,1378.932a.044.044,0,0,0,0-.015l.443,0a.047.047,0,0,1,.034.012Z" transform="translate(219.805 -1356.241)" fill="#fff"></path>
                </g>
              </g>
            </svg>
          </button>
          <button className="method-google" data-channel="google">
            <svg xmlns="http://www.w3.org/2000/svg" width="25.06" height="25.571" viewBox="0 0 25.06 25.571">
              <defs>
                <clipPath id="clipPath">
                  <path id="Intersection_4" data-name="Intersection 4" d="M4.329,12.013V8.8A5.873,5.873,0,0,0,6.88,4.946H0V0H12.042a14.7,14.7,0,0,1,.233,2.616,12.474,12.474,0,0,1-3.813,9.4Z" fill="none" stroke="#707070" strokeWidth="1"></path>
                </clipPath>
                <clipPath id="clipPath-2">
                  <path id="Intersection_6" data-name="Intersection 6" d="M0,3.313V0H4.272a7.619,7.619,0,0,0,7.154,5.27,7.682,7.682,0,0,0,4.329-1.22l4.132,3.209a12.212,12.212,0,0,1-8.462,3.1A12.78,12.78,0,0,1,0,3.313Z" fill="none" stroke="#707070" strokeWidth="1"></path>
                </clipPath>
                <clipPath id="clipPath-3">
                  <path id="Intersection_8" data-name="Intersection 8" d="M0,5.742A12.768,12.768,0,0,1,1.36,0H5.632V3.313a7.55,7.55,0,0,0,0,4.859L1.36,11.484A12.773,12.773,0,0,1,0,5.742Z" fill="none" stroke="#707070" strokeWidth="1"></path>
                </clipPath>
                <clipPath id="clipPath-4">
                  <path id="Intersection_10" data-name="Intersection 10" d="M0,7.044A12.78,12.78,0,0,1,11.425,0,12.29,12.29,0,0,1,19.98,3.329L16.312,7a6.908,6.908,0,0,0-4.887-1.91,7.618,7.618,0,0,0-7.154,5.27Z" fill="none" stroke="#707070" strokeWidth="1"></path>
                </clipPath>
              </defs>
              <g id="Group_14376" data-name="Group 14376" transform="translate(12.786 10.461)">
                <g id="Group_14375" data-name="Group 14375" transform="translate(0 0)" clipPath="url(#clipPath)">
                  <rect id="Rectangle_6897" data-name="Rectangle 6897" width="26.481" height="26.219" transform="translate(-7.103 -7.104)" fill="#3e82f1" stroke="#707070" strokeWidth="1"></rect>
                </g>
              </g>
              <g id="Group_14378" data-name="Group 14378" transform="translate(1.36 15.215)">
                <g id="Group_14377" data-name="Group 14377" transform="translate(0)" clipPath="url(#clipPath-2)">
                  <rect id="Rectangle_6899" data-name="Rectangle 6899" width="34.094" height="24.563" transform="translate(-7.104 -7.104)" fill="#32a753" stroke="#707070" strokeWidth="1"></rect>
                </g>
              </g>
              <g id="Group_14380" data-name="Group 14380" transform="translate(0 7.044)">
                <g id="Group_14379" data-name="Group 14379" clipPath="url(#clipPath-3)">
                  <rect id="Rectangle_6901" data-name="Rectangle 6901" width="19.838" height="25.69" transform="translate(-7.103 -7.103)" fill="#f9bb00" stroke="#707070" strokeWidth="1"></rect>
                </g>
              </g>
              <g id="Group_14382" data-name="Group 14382" transform="translate(1.36)">
                <g id="Group_14381" data-name="Group 14381" transform="translate(0)" clipPath="url(#clipPath-4)">
                  <rect id="Rectangle_6903" data-name="Rectangle 6903" width="34.187" height="24.563" transform="translate(-7.104 -7.103)" fill="#e74235" stroke="#707070" strokeWidth="1"></rect>
                </g>
              </g>
            </svg>
          </button>
        </div>
        <div>- or -</div>
      </div>
      <form>
        <div className="box-input">
          <div className="div-wallets_1">
            <button type="button"><img src={icon_ethereum}></img>Ethereum</button>
            <button type="button"><img src={icon_klaytn}></img>Klayth</button>
            <button type="button"><img src={icon_solana}></img>Solana</button>
            <button type="button"><img src={icon_binance}></img>Binance</button>
          </div>
          <div className="div-wallets_2">
            <div className="row">
              <button type="button"><img src={icon_metamask}></img>Metamask</button>
              <button type="button"><img src={icon_ethereum2}></img>Wallet Connector</button>
            </div>
            <div className="row">
              <button type="button"><img src={icon_talk}></img>Talken</button>
              <button type="button"><img src={icon_klaytn}></img>Kaikas</button>
            </div>
          </div>
          <label className="div-keep_logged_in">
            <input type="checkbox"></input>
            <span>Keep me logged in</span>
          </label>
          <button type="submit" className="button-login">Log in</button>
          <button className="button-forgot-password">Forgot Password?</button>
        </div>
      </form>
      <Popup modal
        onClose={close}
        trigger={
          <div className="text_switch">
            <button><span>New user? Create your account!</span></button>
          </div>
        }
        {...{ overlayStyle, closeOnDocumentClick }}
      >
        {close => <SignupForm close={close} />}
      </Popup>
    </div>
  </div>
);
export default LoginForm