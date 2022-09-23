import React from "react";

import logo from '../../assets/img/landing-logo.png';

const TermsandConditions = ({ close }) => (
	<div className="modal-landingpage">
		
		<div className="modal-box">
			<div className="modal-content">
				<button className="close" onClick={close}>
					<svg xmlns="http://www.w3.org/2000/svg" width="24.329" height="24.329" viewBox="0 0 24.329 24.329"><path id="Path_84708" data-name="Path 84708" d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z" transform="translate(-5 -5)" fill="#fff"></path></svg>
				</button>
				<div className="logo">
					<img src={logo} alt="" />
				</div>
				<h1>NFT Terms and Conditions</h1>
				<p>
					<span>$5 Off Old Navy Classic Flag Tee</span>
					: Offer valid on select 
					<span> Old Navy Classic Flag Tee </span>
					 merchandise only from 6/29/22 at 12:00 am PT through 7/30/22 at 11:59 pm PT in the US (including Puerto Rico) at Old Navy stores and online at 
					<a href="https://oldnavy.gap.com/" target="_blank" rel="noreferrer"> oldnavy.com </a>. Each code offers a $5 off Old Navy Classic Flag Tee coupon and one Free Ship coupon. 
					<span>Valid for one time use only</span>. Select styles only. While supplies last. Not valid on international purchases. Discount applies to merchandise only, not value of gift cards purchased, packaging, applicable taxes or shipping &amp; handling charges. No adjustments on previous purchases. Not valid for cash or cash equivalent. Cannot be combined with other offers or discounts including Gap Inc. employee discount. Gap Inc. is not responsible for lost or stolen coupons. To redeem this offer at 
					<a href="https://oldnavy.gap.com/" target="_blank" rel="noreferrer"> oldnavy.com </a>, enter promo code at checkout.
				</p>
				<p>
					<span>Free 5-7 Day Shipping</span>
					: Valid on Old Navy online orders placed from 6/29/22 at 12:00 am PT through 7/30/22 at 11:59 pm PT and shipped to a single Continental U.S. address, excluding P.O. Boxes and APO/FPO addresses. PLEASE NOTE that 
						<a href="https://www.gap.com/" target="_blank" rel="noreferrer"> gap.com</a>, 
						<a href="https://bananarepublic.gap.com/" target="_blank" rel="noreferrer"> bananarepublic.com </a>, 
						<a href="https://oldnavy.gap.com/" target="_blank" rel="noreferrer"> oldnavy.com </a> and 
						<a href="https://athleta.gap.com/" target="_blank" rel="noreferrer"> athleta.com </a> 
						will not be responsible for delivery delays due to unforeseen circumstances outside our reasonable control such as delays due to severe weather, natural disasters or strikes. Must enter promo code and select the FREE 5-7 business days shipping option. 
						<span>Valid for one time use only</span>
						. Delivery times are subject to change without notice. No adjustments on previous purchase
				</p>
			</div>
		</div>
	
	</div>
  );
export default TermsandConditions;
