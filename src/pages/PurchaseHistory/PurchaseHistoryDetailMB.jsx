import React from 'react';
import twitter_icon from '../../assets/svg/twitter_icon.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import {isMobile} from 'react-device-detect';

const Purchase_History_Detail = () => {
	return(
		<main className="purchase-detail-container-mb">
			<Link to="/purchase-history" className="back-purchase-list">
				<svg xmlns="http://www.w3.org/2000/svg" width="28.021" height="15.509" viewBox="0 0 28.021 15.509"><path id="Path_84705" data-name="Path 84705" d="M25.033,13.816H4v3.877H25.033v5.816l6.988-7.755L25.033,8Z" transform="translate(-4 -8)" fill="#fff"></path></svg>
				Back
			</Link>
			<div className="collectible">
				<div className="collectible-image-container">
					<img src="https://collectible.sweet.io/series/1727/images/front.png" alt="" />
				</div>
				<div className="campaignBlock">
					<img height={30} src="https://static.assets.sweet.io/campaigns/267/avatar.jpg" alt="" />
					<div className="campaign_name"> Sweet </div>
					<img height={19} valign={top} src="https://collectible.sweet.io/static/verified.png"></img>
				</div>
				<h1>Strawberry Shortcake Space Creampop #49</h1>
				<div className="collectibleDescription">
					<p className="description_text">
          	The only thing better than ice cream is ice cream in SPACE!
        	</p>
					<button>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/OOjs_UI_icon_info_big.svg/1200px-OOjs_UI_icon_info_big.svg.png" alt="Information"/>
						<span>Authenticity</span>
					</button>
				</div>
				<div className="current_owner">
					<img id="profile_image" height={30} src="https://lh3.googleusercontent.com/a/AATXAJxEAWU5gCe8QEZrHleAchePl1Prf7Fu1ZFoLq5X=s500-c"/>
					<br />
					<div className="current_owner_title">Current Owner</div>
						Martin K.
				</div>
				<div className="infoContainer">
					<div className="collectible-info-boxes">
						<div className="info">
							<p className="title">Total Run</p>
							<p className="value">2000</p>						
						</div>
						<div className="info">
							<p className="title">Date Issued</p>
							<p className="value">08/29/2022</p>						
						</div>
						<div className="info">
							<p className="title">Acquired</p>
							<p className="value">09/02/2022</p>						
						</div>
						<div className="info">
							<p className="title">Token Type</p>
							<p className="value">ERC721</p>						
						</div>
						<div className="info">
							<p className="title">Network</p>
							<p className="value">Polygon</p>						
						</div>
					</div>
				</div>
				<div className="marketPlaceBtn">
					<a href="#" target={'_blank'}>
						<div className="marketplace-container">
							<span>
								<img class="marketplace-icon" src="https://collectible.sweet.io/static/sweet-pop-white.svg"/>
							</span>
							<span className='marketplace-text'>Visit the Marketplace</span>
						</div>
					</a>
				</div>
			</div>
			
		</main>
	)
}
export default Purchase_History_Detail