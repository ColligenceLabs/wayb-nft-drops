import Navbar from 'components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';

const CollectionLayout = () => {
  return (
    <>
      <div className="collection-page">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default CollectionLayout;
