import React, { useState, FormEvent } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './routes';
import { icp } from '../../declarations/icp';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (event.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement;
    const greeting = await icp.greet(name.value);
    setGreeting(greeting);
  };

  return (
    <main>
      <Routes>
        {AuthRoutes}
      </Routes>
    </main>
  );
};

export default App;
