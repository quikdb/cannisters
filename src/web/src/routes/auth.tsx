import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import SignupOTP from '../pages/auth/SignupOTP';
import SignupOTL from '../pages/auth/SignupOTL';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Verify from '../pages/auth/Verify';

export const AuthRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signup/otp' element={<SignupOTP />} />
        <Route path='signup/otl' element={<SignupOTL />} />
        <Route path='verify' element={<Verify />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

