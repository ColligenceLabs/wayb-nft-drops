import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const StudioLayout = () => {
  let location = useLocation();
  return (
    <>
      <div className={`${location.pathname === "/" ? "main" : ""}`}>
        <div className="background-section01"></div>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default StudioLayout;
