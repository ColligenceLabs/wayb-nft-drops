import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';
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
