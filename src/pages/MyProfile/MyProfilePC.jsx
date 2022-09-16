import React from 'react';
import twitter_icon from '../../assets/svg/twitter_icon.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import Popup from "reactjs-popup";
import Edit from "./editprofile";
import Delete from './deleteaccount'
import {isMobile} from 'react-device-detect';
import MyProfileMB from './MyProfileMB'

const MyProfile = () => {
	return(
		isMobile ? <MyProfileMB /> :
		<main className="profile-container">
			<div className="my-profile-page">
				<div className="my-profile-header">
					<h1>My profile</h1>
				</div>
				
				<div className="my-profile-detail">
					<div className="my-profile-leftdetail">
						<div className="my-profile-detail-header">
							<div>
								<img src="https://chiase24.com/wp-content/uploads/2022/02/Tong-hop-hinh-anh-gai-xinh-de-thuong-cute-nhat-1.jpg" alt="avatar" className="avatar"/>
								<div className="my-profile-name">
									<div className="fullname">Chainos</div>
									<div className="username">@Chainos_2022</div>
								</div>
							</div>
							<div className="myProfileSocials">
								<div className="Socialsdetail">
									<div className="value">15</div>
									<div className="label">NFTs</div>
								</div>
								<div className="Socialsdetail">
									<div className="value">300</div>
									<div className="label">Followers</div>
								</div>
								<div className="Socialsdetail">
									<div className="value">5</div>
									<div className="label">Sold</div>
								</div>
							</div>
						</div>
						<div className="bio"></div>
						<div className="my-profile-contact">
							<div className="contact-detail">
								<div className="title">😀  Name</div>
								<div className="content">Chainos</div>
							</div>
							<div className="contact-detail">
								<div className="title">🎂  Birthday</div>
								<div className="content">16/09/2000</div>
							</div>
							<div className="contact-detail">
								<div className="title">📨  Email</div>
								<div className="content">noreply@chainos</div>
							</div>
							<div className="contact-detail">
								<div className="title">📱  Mobile Phone</div>
								<div className="content"></div>
							</div>
						</div>
					</div>
					<div className="my-profile-rightdetail">
						<div className="my-profile-rightdetail-item">
							<div className="item-label">
								<img src={twitter_icon} alt="" />Twitter
							</div>
							<div className="item-value">twitter/Chainos</div>
						</div>
						<Popup modal trigger={
							<button>
								Edit Profile
							</button>
						}>
							{close => <Edit close={close} />}
						</Popup>
						<Popup modal trigger={
							<button className="delete-account">
								Delete Account
							</button>
						}>
							{close => <Delete close={close} />}
						</Popup>
					</div>
				</div>
			</div>
		</main>
	)
}
export default MyProfile;