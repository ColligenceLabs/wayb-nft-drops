import StudioLayout from '../components/layouts/studioLayout/StudioLayout';
import React from 'react';
import Homepage from 'pages/homepage';

const Router = () => [
  {
    path: '/',
    element: <StudioLayout />,
    children: [{ path: '/', element: <Homepage /> }],
  },
];

export default Router;
