import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage/HomePagePC';
import Collections from 'pages/Collections';
import SaleCollectibles from 'pages/SaleCollectibles';
import Collection from 'pages/Collection';
import MyCollectibles from 'pages/MyCollectibles/MyCollectiblesPC';
import Landing from 'pages/Landingpage';
import LandingLayout from 'components/layouts/studioLayout/LandingLayout';
import Profile from 'pages/MyProfile'

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collection', element: <Collection/> },
      { path: '/collections', element: <Collections/> },
      { path: '/sale', element: <SaleCollectibles/> },
      { path: '/my-collectibles', element: <MyCollectibles/> },
      { path: '/my-profile', element: <Profile/> },
  ],
  },
  {
    element: <LandingLayout />,
    children: [{ path: '/landingpage', element: <Landing /> }],
  },

];

export default Router;
