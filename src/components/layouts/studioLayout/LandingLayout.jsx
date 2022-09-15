import Footer from 'components/footer/Footer';
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
