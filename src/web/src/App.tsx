import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRoutes, DashboardRoutes } from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path='/*' element={<AuthRoutes />} /> */}
        <Route path='/*' element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
