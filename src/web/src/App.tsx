import React, { useState, FormEvent } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthRoutes, DashboardRoutes } from './routes';
// import { icp } from '../../declarations/icp';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const name = (event.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement;
  //   const greeting = await icp.greet(name.value);
  //   setGreeting(greeting);
  // };

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<AuthRoutes />} />
        <Route path='/dashboard/*' element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
