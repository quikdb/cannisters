import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';

export const AuthRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Login />} />
      </Routes>
    </>
  );
};

