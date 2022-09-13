import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage/HomePagePC';
import Collections from 'pages/Collections';
import SaleCollectibles from 'pages/SaleCollectibles';
import Collection from 'pages/Collection';
import Landing from 'pages/Landingpage';
import LandingLayout from 'components/layouts/studioLayout/LandingLayout';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collection', element: <Collection/> },
      { path: '/collections', element: <Collections/> },
      { path: '/sale', element: <SaleCollectibles/> },
  ],
  },
  {
    element: <LandingLayout />,
    children: [{ path: '/landingpage', element: <Landing /> }],
  },

];

export default Router;
