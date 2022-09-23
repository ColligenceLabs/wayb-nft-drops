import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/img/landing-logo.png';
import left_cross from '../../assets/img/left_cross.png';
import magic_dogs from '../../assets/img/magic_dogs.gif';
import boys_girls_club_logo from '../../assets/svg/boys_girls_club_logo.svg';
import facebook_icon from '../../assets/svg/facebook.svg';
import instagram_icon from '../../assets/svg/instagram_icon.svg';
import twitter_icon from '../../assets/svg/twitter_icon.svg';
import avatar_user from '../../assets/img/avatar_user.webp';
import nav_icon from '../../assets/icon/nav_icon.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import Popup from 'reactjs-popup';
import TermsandConditions from './TermsandConditions';
import Faq from './faq';
import { Link } from 'react-router-dom';
import UsernameBox from 'components/common/UsernameBox';
import useOnClickOutside from 'components/common/useOnClickOutside';
import DialogWallets from 'components/modal/DialogWallets';
import SidebarMb from 'components/sidebar/SidebarMb';
import { useModalWalletsStore, useSidebarStore } from 'components/common/AppStore';
import 'reactjs-popup/dist/index.css';


const Landing = () => {
  const [open, setOpen] = useState(false);
  const [FaqOpen, setFaqOpen] = useState(false);
  const [TermsandConditionsOpen, setTermsandConditionsOpen] = useState(false);
  const element = document.getElementById('buy-now-mb');

  const ref = useRef();
  var opened = false;

  const [isModalOpen, setModalOpen] = useState(false);
  const {openSidebar} = useSidebarStore();
  
  useOnClickOutside(ref, () => setModalOpen(false));

  const CloseTermsandConditions = () =>{
    setTermsandConditionsOpen(false);
  }
  const CloseFaq = () =>{
    setFaqOpen(false);
  }
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [scrollPercentPosition, setScrollPercentPosition] = useState(0);
  const handleScrollPercent = () => {
    const positionPercent =
      (window.pageYOffset /
        (document.documentElement.offsetHeight - window.innerHeight)) *
      100;
    setScrollPercentPosition(positionPercent);
  };
    if(scrollPercentPosition == 100){
    element.className = "buy-now-mb-hidden";

  }
  if(scrollPercentPosition < 100 && scrollPercentPosition>20){
    element.className = "buy-now-mb"
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScrollPercent);

    return () => {
      window.removeEventListener('scroll', handleScrollPercent);
    };
  },[]);

  return(
    <main className="landing-container">
      <div className="box-landing" >
        <div className="navbar">
          <div className="box-nav">
            <div className="line-left"></div>
            <img src={logo} alt="" className="logo" />
            <div className="line-right"></div>
            <img src={left_cross} alt="" className="left_cross" />
            <button className="faq" onClick={() => setFaqOpen(true)}>FAQ</button>
            <Popup modal >
              {(close) => <Faq close={close} />}
            </Popup>
            {/* <button className="sign-up">Sign Up</button> */}
            <div className="icon-nav">
              <button className="button" onClick={openSidebar}>
                <img src={nav_icon} alt="Navbar Icon" />
                {/* side bar */}
              </button>
              <SidebarMb
              />
            </div>
            <div className="wrapper-user">
              <div className="avatar-user">
                <img src={avatar_user} alt="profile-avatar" />
              </div>
              <p className="user-name">User name</p>
            </div>
            <button
              ref={ref}
              className="username-dropdown button"
              onClick={() => setModalOpen(!isModalOpen)}
            >
              <svg
                className="sc-196ec885-12 eKhfKP"
                xmlns="http://www.w3.org/2000/svg"
                width="18.092"
                height="11.168"
                viewBox="0 0 18.092 11.168"
              >
                <path
                  id="Path_46142"
                  data-name="Path 46142"
                  d="M-10858.465-7358l6.925,6.926,6.925-6.926"
                  transform="translate(10860.586 7360.121)"
                  fill="none"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeWidth="3"
                ></path>
              </svg>
              {/* user dropdown box */}
              {isModalOpen && <UsernameBox />}
            </button>
            <DialogWallets />
          </div>
					<div className="line"></div>
        </div>
        <div className="landing-box-detail">
          <div className="details">
						<img className="magic-arch-mobile" src={logo} alt="magic dog arch"/>
            <div className="dog-gift">
              <img src={magic_dogs} alt="" />
            </div>
            <div className="magic-arch-wrapper">
              <p>
                Featuring
                <strong> 1,994 NFTS</strong>
                (a nod to Old Navy’s founding year), each one is a unique,
                digital profile pic of our Magic the Dog mascot. All Magics
                sport the flag tee and other hand-drawn, algorithmically
                generated traits co-created with Boys &amp; Girls Clubs of
                America youth arts community.
              </p>
              <div>
                <div>
                  <strong>An NFT &amp; A Flag Tee For Under A Buck</strong>
                </div>
                <p>
                When you buy an NFT, we’ll throw in our iconic flag tee* as well
                as future access to perks, incentives and more.</p> 
              </div>
              <div>
                <div className="box_info">
                  <h3>What You Need to Know:</h3>
                  <ul>
                    <li>
                      Each common NFT costs
                      <span>
                        only 94 cents, and can be purchased with crypto or
                        credit card!
                      </span>
                    </li>
                    <li>
                      <span>One epic Magic</span>
                      will be up for auction with exclusive utility, including a
                      $1K gift card to Old Navy aka a summer splurge for you and
                      all your friends.
                    </li>
                    <li>
                      Our NFTs will live on
                      <span>Tezos</span>, a public blockchain that uses minimal
                      energy consumption with a low carbon footprint, and are
                      available through the
                      <span>Sweet marketplace</span>.
                    </li>
                    <li>
                      Be quick, these are on a first-come basis and
                      <span>limit one per customer</span>.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="buynow-wrapper">
                <Link to="/collections" target="_blank">
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="lading-box-info">
          <h1>Co-Created With Boys & Girls Clubs of America</h1>
          <div className="top-box-info">
            <img src={boys_girls_club_logo} alt="" />
            <p>
              Those talented teens helped dream up stylistic traits for Magic —
              from fashion to fur colors. To celebrate their contribution and to
              support a more inclusive future through art,
              <span> 100% of proceeds go back to them.</span>
            </p>
            <a href="https://www.bgca.org/" target="_blank">
              Visit Boys &amp; Girls Club of America
            </a>
          </div>
          <div className="step_start">
            <h1>Easy Steps to Get Started</h1>
            <div className="step_detail">
              <div className="detail_info">
                <h2>01.</h2>
                <h3>Visit Old Navy </h3>
                <p>
                  Visit
                  <a
                    href="http://www.oldnavy.com/nft"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    www.oldnavy.com/nft{' '}
                  </a>
                  and follow simple steps to create or connect an existing
                  account through our NFT partner, Sweet. Once logged in,
                  bookmark and be prepared for the launch date and time.
                </p>
              </div>
              <div className="detail_info">
                <h2>02.</h2>
                <h3>Launch Date</h3>
                <p>
                  The 1,993 common generative Magic the Dog NFTs will be
                  released for purchase at
                  <span> 12:00pm EDT/9:00am PDT </span>. Come early and click
                  Buy Now to purchase, limit one per customer.
                </p>
              </div>
              <div className="detail_info">
                <h2>03.</h2>
                <h3>Place Your Bid</h3>
                <p>
                  Visit the
                  <span> Epic NFT Auction </span>, place your bid, and try to
                  win this ultra-rare NFT. (Payment completed upon conclusion of
                  auction).
                </p>
              </div>
              <div className="detail_info">
                <h2>04.</h2>
                <h3>Purchase Collectible</h3>
                <p>
                  Once your NFT is purchased it will appear in your personal
                  wallet that you can access at any time by logging in to your
                  account at
                  <a href="https://sweet.io/" target="_blank" rel="noreferrer">
                    {' '}
                    www.sweet.io
                  </a>
                </p>
              </div>
              <div className="detail_info">
                <h2>05.</h2>
                <h3>Get Your Flag Tee</h3>
                <p>
                  Between
                  <span> June 29, 2022 until July 30, 2022 </span>, visit any
                  Old Navy store or
                  <a
                    href="http://www.oldnavy.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {' '}
                    www.oldnavy.com{' '}
                  </a>
                  to redeem your code - received at the time you purchase your
                  NFT - for a classic Flag Tee.
                </p>
              </div>
              <div className="detail_info">
                <h2>06.</h2>
                <h3>Visit Boys & Girls Clubs of America</h3>
                <p>
                  Visit Boys and Girls Clubs of America
                  <a href="http://www.bgca.org"> www.bgca.org </a>
                  to discover other ways that you can get involved and help out.
                </p>
              </div>
            </div>
            <div className="note">
              *Each code offers a $5 off Old Navy Classic Flag Tee coupon and
              one Free Ship coupon. Each code is one-time use, valid in-store
              and online. Free Ship coupon applied to online orders only. Offer
              valid in-store 6/29 through 7/30, and for online orders placed on
              6/29 through 7/30 from 12:00 AM PDT to 11:59 PM PDT. Offer valid
              only in the U.S. Limited time only and while supplies last.
            </div>
          </div>
        </div>
        <div className="landing_follow">
          <h1>Follow @oldnavy</h1>
          <div className="social-buttons">
            <a
              href="https://www.twitter.com/oldnavy/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="social-icon"
                src={twitter_icon}
                alt="twitter icon"
              />
              Twitter
            </a>
            <a
              href="https://www.instagram.com/oldnavy/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="social-icon"
                src={instagram_icon}
                alt="instagram icon"
              />{' '}
              Instagram
            </a>
            <a
              href="https://www.facebook.com/oldnavy/"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="social-icon"
                src={facebook_icon}
                alt="facebook icon"
              />{' '}
              Facebook
            </a>
          </div>
          <Popup modal trigger={<a>Terms and Conditions</a>}>
            {(close) => <TermsandConditions close={close} />}
          </Popup>
        </div>
        <div className='name' id='buy-now-mb'>
					<Link to="/collections" target="_blank" className="Buy-button-mb">Buy Now</Link>
				</div>
        <Popup
          open={FaqOpen}
          onClose={CloseFaq}
          modal
          closeOnDocumentClick
        >
          <Faq close={CloseFaq}/>
        </Popup>
      </div>
    </main>
  );
};
export default Landing;
