import React from "react";
import avatar from '../../assets/img/avatar.png';

export default ({ close }) => (
	<div className="modal-editprofile">
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="edit-profile-modal-box">
					<div className="title">
						<div>Edit Profile</div>
						<button className="close" onClick={close}>
							<svg 
								xmlns="http://www.w3.org/2000/svg" 
								width="24.329" height="24.329" 
								viewBox="0 0 24.329 24.329">
									<path 
										id="Path_84708" 
										data-name="Path 84708" 
										d="M29.329,7.45,26.878,5l-9.714,9.714L7.45,5,5,7.45l9.714,9.714L5,26.878l2.45,2.45,9.714-9.714,9.714,9.714,2.45-2.45-9.714-9.714Z" 
										transform="translate(-5 -5)" 
										fill="#fff">
									</path>
							</svg>
						</button>
					</div>
					<form>
						<div className="form-content">
							<div className="content-box">
								<div className="content-title">
									Username
								</div>
								<input placeholder="Change Username"/>
							</div>
							<div className="content-box">
								<div className="content-title">
									Email address
								</div>
								<input placeholder="Change Email"/>
							</div>

							<div className="content-box photo">
								<div className="content-title">
								Edit Profile Photo
								</div>
								<div className="avatar">
									<img id="avatar_upload" src={avatar}></img> 
									<input type="file" id="file-upload" onChange={loadFile} accept="image/*" />
									<svg id="edit_black_24dp" 
										xmlns="http://www.w3.org/2000/svg" 
										width="23.278" height="23.278" viewBox="0 0 23.278 23.278">
											<path   id="Path_84725" 
													data-name="Path 84725" 
													d="M0,0H23.278V23.278H0Z" fill="none">
											</path>
											<path   id="Path_84726"     
													data-name="Path 84726" 
													d="M13.727,8.839l.892.892L5.832,18.519H4.94v-.892l8.788-8.788M17.219,3a.971.971,0,0,0-.679.281L14.765,5.056,18.4,8.693l1.775-1.775a.966.966,0,0,0,0-1.368l-2.27-2.27A.952.952,0,0,0,17.219,3ZM13.727,6.094,3,16.821v3.637H6.637L17.365,9.731Z" 
													transform="translate(-0.09 -0.09)" fill="#fff">
											</path>
									</svg>
								</div>
							</div>
							<button type="submit" className="">Save Changes</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
);

function loadFile(event) {
	if (event.target.files.length > 0) {
		avatar = URL.createObjectURL(event.target.files[0]);
		// setFile(avatar);
		// avatar_upload.src = {avatar}
	}
};