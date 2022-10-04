import React, { SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/img/landing-logo.png';

type FaqProps = {
  close: boolean | SetStateAction<any>;
};
const Faq: React.FC<FaqProps> = ({ close }) => (
  <div className="modal-landingpage">
    <div className="modal-box">
      <div className="modal-content">
        <button className="close" onClick={close}>
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
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h1>Frequently Asked Questions</h1>
        <div className="table-faq">
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('1')}>
              <span>What is an NFT?</span>
              <svg
                onClick={() => myFunction('svg1')}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="svg1"
                id="svg1"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="1">
              NFTs - or non-fungible tokens - are unique collectibles in digital
              format. To ensure each NFT’s authenticity, Sweet uses blockchain
              technology to demonstrate rights of ownership and authenticity.
              This is similar to receiving a “certificate of authenticity” with
              unique physical merchandise like a signed baseball card.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('2')}>
              <span>How do I buy and sell NFTs?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="2">
              To purchase - and later sell - an NFT, you must first set up a
              digital wallet. When you create an account with
              <Link to={'/'} target="_blank">
                {' '}
                Talken{' '}
              </Link>
              , a digital wallet will automatically be created for you. The
              Magic NFTs may be purchased using a credit card or cryptocurrency.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('3')}>
              <span>Where does my NFT go once I buy it?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="3">
              Once purchased, your NFT will appear in your digital wallet. Think
              of it as the place where you keep all of your digital
              collectibles. You can access your digital wallet by logging into
              your account with Old Navy’s partner, Sweet.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('4')}>
              <span>How do I get my Flag Tee?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="4">
              Magic NFT holders can claim their classic flag tee at their local
              Old Navy store or on
              <a href="http://www.oldnavy.com" target="_blank" rel="noreferrer">
                {' '}
                www.oldnavy.com{' '}
              </a>
              using a redemption code delivered along with their NFT. Each code
              is one-time use, and is valid starting June 29 through July 30
              while supplies last. Online orders of the flag tee will receive
              free shipping.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('5')}>
              <span>Why is Old Navy releasing NFTs?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="5">
              As an iconic American fashion brand, we love to roll out the red,
              white and blue carpet for Independence Day, which is why we’re
              excited to bring our iconic flag tees - which have become part of
              American tradition for millions of families - into the metaverse.
              We’ve partnered with Sweet to create our own limited-edition mint
              of 1,994 NFTs, with 100% of proceeds going to Boys & Girls Clubs
              of America.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('6')}>
              <span>Who designed the NFTs?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="6">
              Our designers co-created the NFT artwork with youth partners from
              Boys & Girls Clubs of America to reimagine our beloved mascot,
              Magic the Dog. Each of the 1,994 one-of-a-kind,
              algorithmically-generated NFTs were inspired by hand-drawn traits
              and ideas by teens in the Clubs’ art community.
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('7')}>
              <span>Can I choose my Magic NFT?</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="7">
              Common NFTs will be automatically generated to buyers. So while
              you can’t choose your Magic, the surprise-and-delight element of
              trait combos is pretty fun – we hope you’ll agree!
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('8')}>
              <span>Sweet</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="8">
              Sweet is the enterprise NFT platform used by top brands and
              creators to design, mint, and distribute NFTs through engaging
              consumer experiences.
              <a href="https://sweet.io/" target="_blank" rel="noreferrer">
                {' '}
                Learn more{' '}
              </a>
            </div>
          </div>
          <div className="faq-title-box">
            <div className="faq-title" onClick={() => myFunction('9')}>
              <span>Tezos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  id="arrow_forward_ios-24px"
                  transform="translate(24) rotate(90)"
                >
                  <path
                    id="Path_1982"
                    data-name="Path 1982"
                    d="M5.88,4.12,13.76,12,5.88,19.88,8,22,18,12,8,2Z"
                    fill="#fff"
                  ></path>
                  <path
                    id="Path_1983"
                    data-name="Path 1983"
                    d="M0,0H24V24H0Z"
                    fill="none"
                  ></path>
                </g>
              </svg>
            </div>
            <div className="faq-content content-hidden" id="9">
              As part of our commitment to create a greener future, we’ve chosen
              to leverage Tezos, an open source blockchain, to create the
              customer experience. Tezos uses a more efficient approach to
              secure its network, allowing it to operate with minimal energy
              consumption and a low carbon footprint.
              <a
                href="https://tezos.com/build-play-collect/"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                Learn more{' '}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Faq;
function myFunction(id: string) {
  const element = document.getElementById(id);
  if (element) {
    if (element.className == 'faq-content content-hidden') {
      element.className = 'faq-content content-show';
    } else {
      element.className = 'faq-content content-hidden';
    }
  }
}
