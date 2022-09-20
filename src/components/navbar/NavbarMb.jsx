import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo_header from '../../assets/img/logo_header.png';
import avatar_user from '../../assets/img/avatar_user.webp';
import search_icon from '../../assets/icon/search_icon.svg';
import nav_icon from '../../assets/icon/nav_icon.svg';
import useOnClickOutside from 'components/common/useOnClickOutside';
import SidebarMb from 'components/sidebar/SidebarMb';
import UsernameBox from 'components/common/UsernameBox';
import DialogWallets from 'components/modal/DialogWallets';
import DialogWalletsMb from 'components/modal/DialogWalletsMb';

const NavbarMb = () => {
  // const [showSidebar, setShowSidebar] = useState(false);
  const ref = useRef();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [openDialogWalletsMb, setOpenDialogWalletsMb] = useState(false);
  const handleOpenWalletDialog = () => {
    setOpenDialogWalletsMb(true);
  };

  const handleCloseWalletDialog = () => {
    setOpenDialogWalletsMb(false);
  };
  let location = useLocation();
  useOnClickOutside(ref, () => setModalOpen(false));

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  const handleHideModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {/* navbar mobile */}
      <div className="navbar-mb">
        <div
          className={`${
            location.pathname === '/' ? 'nav-home' : 'nav-other-page'
          }`}
        ></div>
        <div className="main-header-box">
          <div className="logo-header">
            <Link to={'/'}>
              <img src={logo_header} alt="" />
            </Link>
          </div>
          <div className="search-bar">
            <img src={search_icon} alt="search icon" className="search-icon" />
            <input
              className="input-search"
              type="search-textbox"
              placeholder="Search NFTs..."
            />
          </div>
          <div className="icon-nav">
            <button className="button" onClick={() => setSidebarOpen(true)}>
              <img src={nav_icon} alt="Navbar Icon" />
              {/* side bar */}
            </button>
            <SidebarMb
              show={isSidebarOpen}
              onHide={handleCloseSidebar}
              openWallets={handleOpenWalletDialog}
              onHideWalletsMb={handleCloseWalletDialog}
            />
          </div>

          {/* after login */}
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
              className="sc-196ec885-12"
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
            {isModalOpen && <UsernameBox onHide={handleHideModal} />}
            {/* wallets box */}
            <DialogWalletsMb
              showWalletsMb={openDialogWalletsMb}
              onHideWalletsMb={handleCloseWalletDialog}
              openWallets={handleOpenWalletDialog}
              onHide={handleCloseSidebar}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarMb;
