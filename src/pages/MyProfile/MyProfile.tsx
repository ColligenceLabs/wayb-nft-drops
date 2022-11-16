import React, { useEffect, useState } from 'react';
import twitter_icon from '../../assets/svg/twitter_icon.svg';
import icon_insta_realistic from '../../assets/svg/icon_insta_realistic.svg';
import avatar from '../../assets/img/avatar_user.webp';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import Popup from 'reactjs-popup';
import Edit from './editprofile';
import Delete from './deleteaccount';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getHistory, getMyMBoxList } from '../../services/services';

const MyProfile = () => {
  const dropsAccount = useSelector((state: any) => state.account.account);
  const [nNfts, setNNfts] = useState(0);
  const navigate = useNavigate();

  function toStringByFormatting(source: Date) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();

    return [year, month, day].join('.');
  }

  useEffect(() => {
    const fetchMyNfts = async () => {
      const talkenData = localStorage.getItem('talken.data');
      let _talkenData;
      let talkenUid = null;
      if (talkenData) {
        _talkenData = JSON.parse(talkenData);
        talkenUid = _talkenData.uid;
      }
      if (dropsAccount.address) {
        // const res = await getMyMBoxList(dropsAccount.address, talkenUid, 'ASC');
        const res = await getHistory(dropsAccount.address);
        console.log(res.data);
        if (res.data.status === 1) {
          setNNfts(res.data.data.drops.length);
        }
      }
    };

    fetchMyNfts();
  }, [dropsAccount]);

  useEffect(() => {
    if (dropsAccount.address === '') navigate('/');
  }, [dropsAccount]);
  console.log('dra????', dropsAccount);
  return (
    <main className="profile-container min-height-content">
      <div className="my-profile-page">
        <div className="my-profile-header">My Profile</div>

        <div className="my-profile-detail">
          <div className="my-profile-leftdetail">
            <div className="my-profile-detail-header">
              <div className="wrapper-profile">
                <div className="avatar">
                  <img
                    src={
                      dropsAccount.profile_image
                        ? dropsAccount.profile_image
                        : avatar
                    }
                    alt="avatar"
                  />
                </div>
                <div className="my-profile-name">
                  <div className="fullname">Nickname</div>
                  <div className="username">
                    {dropsAccount.name ? dropsAccount.name : '-'}
                  </div>
                </div>
              </div>
              <div className="myProfileSocials">
                <div className="Socialsdetail">
                  <div className="value">{nNfts}</div>
                  <div className="label">Collections</div>
                </div>
                <div className="Socialsdetail">
                  <div className="value">
                    {toStringByFormatting(new Date(dropsAccount.createdAt))}
                  </div>
                  <div className="label">Joined</div>
                </div>
                {/*<div className="Socialsdetail">*/}
                {/*  <div className="value">5</div>*/}
                {/*  <div className="label">Sold</div>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="bio"></div>
            <div className="my-profile-contact">
              {/* <div className="contact-detail">
                <div className="title">Nickname</div>
                <div className="content">{dropsAccount.name}</div>
              </div> */}
              {/*<div className="contact-detail">*/}
              {/*  <div className="title">Birthday</div>*/}
              {/*  <div className="content">07/05/2018</div>*/}
              {/*</div>*/}
              <div className="contact-detail">
                <div className="title">Email</div>
                <div className="content">
                  {dropsAccount.email ? dropsAccount.email : '-'}
                </div>
              </div>
              {/*<div className="contact-detail">*/}
              {/*  <div className="title">Mobile Phone</div>*/}
              {/*  <div className="content">0123456789</div>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="my-profile-rightdetail">
            <div className="my-profile-rightdetail-item">
              <div className="item-label">
                <img src={twitter_icon} alt="Icon Twitter" />
                Twitter
              </div>
              <div className="item-value">
                <a
                  href={`https://twitter.com/${
                    dropsAccount.twitter ? dropsAccount.twitter : ''
                  }`}
                  target="_blank"
                  className="custom-link-sns"
                >
                  {dropsAccount.twitter ? `${dropsAccount.twitter}` : '-'}
                </a>
              </div>
            </div>
            <div className="my-profile-rightdetail-item">
              <div className="item-label">
                <img src={icon_insta_realistic} alt="Icon Instagram" />
                Instagram
              </div>
              <div className="item-value">
                <a
                  href={`https://instagram.com/${
                    dropsAccount.instagram ? dropsAccount.instagram : ''
                  }`}
                  target="_blank"
                  className="custom-link-sns"
                >
                  {dropsAccount.instagram ? `${dropsAccount.instagram}` : '-'}
                </a>
              </div>
            </div>
            <Popup modal trigger={<button>Edit Profile</button>}>
              {Edit}
            </Popup>
            {/*<Popup*/}
            {/*  modal*/}
            {/*  trigger={*/}
            {/*    <button className="delete-account">Delete Account</button>*/}
            {/*  }*/}
            {/*>*/}
            {/*  {Delete}*/}
            {/*  /!* <>{(close: any) => <Delete close={close} />}</> *!/*/}
            {/*</Popup>*/}
          </div>
        </div>
      </div>
    </main>
  );
};
export default MyProfile;
