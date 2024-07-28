import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';

export const AuthRoutes = (
  <>
    <Route path='/login' element={<Login />} />
  </>
);

