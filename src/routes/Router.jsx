import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage';
import Bucks from 'pages/Bucks';
import Collections from 'pages/Collections';
import SaleCollectibles from 'pages/SaleCollectibles';
import Collection from 'pages/Bucks';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collection', element: <Collection/> },
      { path: '/collections', element: <Collections/> },
      { path: '/sale', element: <SaleCollectibles/> },
      { path: '/bucks', element: <Bucks /> },  
  ],
  },

];

export default Router;
