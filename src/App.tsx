import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import ScrollToTop from 'components/common/ScrollToTop';
import Router from './routes/Router';
import './design/sass/main.scss';
function App() {
  const routing = useRoutes(Router());
  return (
    <div>
      <ScrollToTop />
      {routing}
    </div>
  );
}

export default App;
