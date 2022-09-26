import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage/HomePagePC';
import Collections from 'pages/Collections/CollectionsPC';
import SaleCollectibles from 'pages/SaleCollectibles/SaleCollectiblesPC';
import Collection from 'pages/Collection/CollectionPC';
import MyCollectiblesDetails from 'pages/MyCollectibles/MyCollectiblesDetailsPC';
import Landing from 'pages/Landingpage/LandingPagePC';
import LandingLayout from 'components/layouts/studioLayout/LandingLayout';
import MyCollectibles from 'pages/MyCollectibles/MyCollectiblesPC';
import Profile from 'pages/MyProfile/MyProfilePC';
import Purchase_History from 'pages/PurchaseHistory/PurchaseHistoryPC';
import Purchase_History_Detail from 'pages/PurchaseHistory/PurchaseHistoryDetailPC';

import PuzzleCollection from 'pages/PuzzleCollection/PuzzleCollectionPC';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collection', element: <Collection /> },
      { path: '/collections', element: <Collections /> },
      { path: '/sale', element: <SaleCollectibles /> },
      { path: '/my-collectibles', element: <MyCollectibles /> },
      { path: '/my-collectibles/details', element: <MyCollectiblesDetails /> },
      { path: '/my-profile', element: <Profile /> },
      { path: '/purchase-history', element: <Purchase_History /> },
      { path: '/series', element: <Purchase_History_Detail /> },

      { path: '/puzzle-collection', element: <PuzzleCollection /> },
    ],
  },
  {
    element: <LandingLayout />,
    children: [{ path: '/oldnavy', element: <Landing /> }],
  },
];

export default Router;
