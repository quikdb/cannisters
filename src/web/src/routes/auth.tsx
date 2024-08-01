import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import SignupOTP from '../pages/auth/SignupOTP';

export const AuthRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signup/otp' element={<SignupOTP />} />
      </Routes>
    </>
  );
};

