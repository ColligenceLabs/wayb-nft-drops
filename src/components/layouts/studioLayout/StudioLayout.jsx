import Navbar from 'components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const StudioLayout = () => {
  return (
    <>
      <div className="main">
        <div className="background-section01"></div>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default StudioLayout;
