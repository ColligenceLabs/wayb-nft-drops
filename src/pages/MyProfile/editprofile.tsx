import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import avatar from '../../assets/img/avatar.png';
import edit_blue from '../../assets/img/edit_blue.png';
import { updateAccount } from '../../services/services';
import { useDispatch, useSelector } from 'react-redux';
import { setDropsAccount } from '../../redux/slices/account';
import { CircularProgress } from '@mui/material';
import ic_sell from '../../assets/svg/sell_icon.svg';
import check_success from '../../assets/icon/check_success.png';
import check_error from '../../assets/icon/check_error.png';
import CSnackbar from '../../components/common/CSnackbar';
type editprofileProps = {
  close: boolean | SetStateAction<any>;
};

const editprofile: any = (close: any) => {
  const dropsAccount = useSelector((state: any) => state.account.account);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [previewLogo, setPreviewLogo] = useState<any>('');
  const [logo, setLogo] = useState<File>();
  const [isLoading, setIsloading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    type: '',
    message: '',
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar({
      open: false,
      type: '',
      message: '',
    });
  };

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setPreviewLogo(reader.result);
        setLogo(fileBlob);
        resolve();
      };
    });
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) encodeFileToBase64(e.target.files[0]);
  };
  const handleChangeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'twitter') setTwitter(value);
    else if (name === 'instagram') setInstagram(value);
  };

  const handleClickSave = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    if (logo) formData.append('profileImage', logo);

    const res = await updateAccount(dropsAccount.address, formData);
    if (res.status === 200) {
      dispatch(setDropsAccount(res.data));
      close();
    } else {
      setOpenSnackbar({
        open: true,
        type: 'error',
        message: 'Account update failed.',
      });
    }
    setIsloading(false);
  };

  useEffect(() => {
    if (dropsAccount.address !== '') {
      setName(dropsAccount.name);
      setEmail(dropsAccount.email);
      setPreviewLogo(dropsAccount.profile_image);
      setTwitter(dropsAccount.twitter);
      setInstagram(dropsAccount.instagram);
    }
  }, []);

  return (
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

            <div className="form-content">
              <div className="content-box-edit photo">
                <div className="avatar">
                  <img
                    id="avatar_upload"
                    src={previewLogo ? previewLogo : avatar}
                    alt=""
                  />
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleChangeImage}
                  />
                  <div className="icon-edit">
                    <img src={edit_blue} alt="icon edit" />
                  </div>
                </div>
              </div>
              <div className="content-box-edit">
                <div className="content-title">Nickname</div>
                <span className="wrapper-username">
                  <input
                    placeholder="Change Username"
                    name="name"
                    value={name}
                    onChange={handleChangeInputValue}
                    className="custom-input input-change-username"
                  />
                  <div className="image-check-username">
                    <img src={check_success} alt="Icon Check" />
                    {/* <img src={check_error} alt="Icon Check" /> */}
                  </div>
                </span>
              </div>
              <div className="content-box-edit">
                <div className="content-title">Email address</div>
                <input
                  placeholder="Change Email"
                  name="email"
                  value={email}
                  onChange={handleChangeInputValue}
                  className="custom-input"
                />
              </div>
              <div className="content-box-edit">
                <div className="content-title">Twitter ID</div>
                <input
                  placeholder="Change Twitter"
                  name="twitter"
                  value={twitter}
                  onChange={handleChangeInputValue}
                  className="custom-input"
                />
              </div>
              <div className="content-box-edit">
                <div className="content-title">Instagram ID</div>
                <input
                  placeholder="Change Twitter"
                  name="instagram"
                  value={instagram}
                  onChange={handleChangeInputValue}
                  className="custom-input"
                />
              </div>

              <button onClick={handleClickSave}>
                {isLoading ? (
                  <CircularProgress size={30} color={'inherit'} />
                ) : (
                  <>Save Changes</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CSnackbar
        open={openSnackbar.open}
        type={openSnackbar.type}
        message={openSnackbar.message}
        handleClose={handleCloseSnackbar}
      />
    </div>
  );
};
export default editprofile;
