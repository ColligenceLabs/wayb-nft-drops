import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import React from 'react';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
  return (
    <>
      <div className="landingpage">
        <Outlet />
        <Footer/>
      </div>
    </>
  );
};

export default LandingLayout;
