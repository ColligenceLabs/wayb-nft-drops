import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage/HomePage';
import Collections from 'pages/Collections/Collections';
import SaleCollectibles from 'pages/SaleCollectibles/SaleCollectibles';
import Collection from 'pages/Collection/Collection';
import MyCollectiblesDetails from 'pages/MyCollectibles/MyCollectiblesDetails';
import Landing from 'pages/Landingpage/LandingPage';
import LandingLayout from 'components/layouts/studioLayout/LandingLayout';
import MyCollectibles from 'pages/MyCollectibles/MyCollectibles';
import Profile from 'pages/MyProfile/MyProfilePC';
import PurchaseHistory from 'pages/PurchaseHistory/PurchaseHistory';
import PurchaseHistoryDetail from 'pages/PurchaseHistory/PurchaseHistoryDetail';
import PuzzleCollection from 'pages/PuzzleCollection/PuzzleCollection';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collection/:id', element: <Collection /> },
      { path: '/collections', element: <Collections /> },
      { path: '/sale/:id', element: <SaleCollectibles /> },
      { path: '/my-collectibles', element: <MyCollectibles /> },
      { path: '/my-collectibles/details', element: <MyCollectiblesDetails /> },
      { path: '/my-profile', element: <Profile /> },
      { path: '/purchase-history', element: <PurchaseHistory /> },
      { path: '/series', element: <PurchaseHistoryDetail /> },

      { path: '/puzzle-collection', element: <PuzzleCollection /> },
    ],
  },
  {
    element: <LandingLayout />,
    children: [{ path: '/oldnavy', element: <Landing /> }],
  },
];

export default Router;
