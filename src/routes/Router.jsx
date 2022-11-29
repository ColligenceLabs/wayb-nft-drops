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
import Profile from 'pages/MyProfile/MyProfile';
import PurchaseHistory from 'pages/PurchaseHistory/PurchaseHistory';
import PurchaseHistoryDetail from 'pages/PurchaseHistory/PurchaseHistoryDetail';
import CollectionSale from 'pages/CollectionSale/CollectionSale';
import CollectionSaleDetail from 'pages/CollectionSale/CollectionSaleDetail';
import ClaimTalk from 'talkclaim/ClaimTalk';
import ClaimOwner from 'talkclaim/ClaimOwner';
import Aquarium1402One from 'pages/Landingpage/Aquarium1402-1';
import Aquarium1402Two from 'pages/Landingpage/Aquarium1402-2';
import ItemDetails from 'pages/MyCollectibles/ItemDetails';
import Product from 'pages/Product/Product';
import CollectionWayB from 'pages/CollectionsWayB/Collection';
import MyCollections from 'pages/MyCollectionsWayB/MyCollections';
const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      // { path: '/collection/:id', element: <Collection /> },
      // { path: '/collections', element: <Collections /> },
      // { path: '/collection-sale/:id', element: <CollectionSale /> },
      // { path: '/collection-sale/sale/:id', element: <CollectionSaleDetail /> },
      {
        path: '/collection-sale/sale/single',
        element: <CollectionSaleDetail />,
      },
      // { path: '/sale/:id', element: <SaleCollectibles /> },
      { path: '/my-collectibles', element: <MyCollectibles /> },
      {
        path: '/my-collectibles/details',
        element: <MyCollectiblesDetails />,
      },
      { path: '/my-profile', element: <Profile /> },
      { path: '/purchase-history', element: <PurchaseHistory /> },
      { path: '/series', element: <PurchaseHistoryDetail /> },

      { path: '/creator/:id', element: <Collection /> },
      { path: '/creators', element: <Collections /> },
      { path: '/collections/:id', element: <CollectionSale /> },
      {
        path: '/collection/:collectionId/:id',
        element: <CollectionSaleDetail />,
      },
      { path: '/mbox/:id', element: <SaleCollectibles /> },
      {
        path: '/airdrop/:collectionId/:id',
        element: <CollectionSaleDetail />,
      },
      {
        path: '/klaytn/:contractAddress/:itemNo/:id',
        element: <ItemDetails />,
      },
      {
        path: '/:network/:contractAddress/:itemNo/:id',
        element: <ItemDetails />,
      },
      // { path: '/klaytn/featured/:id', element: <Collection /> },
      // { path: '/klaytn/featureds', element: <Collections /> },
      // { path: '/klaytn/collections/:id', element: <CollectionSale /> },
      // {
      //   path: '/klaytn/collection/:collectionId/:id',
      //   element: <CollectionSaleDetail />,
      // },
      // { path: '/klaytn/mbox/:id', element: <SaleCollectibles /> },
      // {
      //   path: '/klaytn/airdrop/:collectionId/:id',
      //   element: <CollectionSaleDetail />,
      // },
      {
        path: '/product',
        element: <Product />,
      },
      {
        path: '/collectionWayB',
        element: <CollectionWayB />,
      },
      {
        path: '/mycollectionWayB',
        element: <MyCollections />,
      },
    ],
  },
  {
    element: <LandingLayout />,
    children: [
      { path: '/oldnavy', element: <Landing /> },
      { path: '/aquarium-1402-1', element: <Aquarium1402One /> },
      { path: '/aquarium-1402-2', element: <Aquarium1402Two /> },
    ],
  },

  { path: '/claimTalk', element: <ClaimTalk /> },
  { path: '/admp', element: <ClaimOwner /> },
];

export default Router;
