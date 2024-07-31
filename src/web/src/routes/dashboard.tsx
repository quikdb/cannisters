import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/dashboard/Home';

export const DashboardRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='home' element={<Home />} />
      </Routes>
    </>
  );
};
