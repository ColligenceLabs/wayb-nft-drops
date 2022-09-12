import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage';
import Bucks from 'pages/Bucks';
import Collections from 'pages/Collections';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [
      { path: '/', element: <Homepage /> },
      { path: '/collections', element: <Collections /> },
      { path: '/bucks', element: <Bucks /> },  
  ],
  },
  // {
  //   path: '/collection',
  //   element: <CollectionLayout />,
  //   children: [{ path: '/collection', element: <Collection /> }],
  // },
  // {
  //   path: '/collections',
  //   element: <CollectionLayout />,
  //   children: [{ path: '/collections', element: <Collections /> }],
  // }
];

export default Router;
