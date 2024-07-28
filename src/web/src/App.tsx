import React, { useState, FormEvent } from 'react';
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
      <img src='/logo2.svg' alt='DFINITY logo' />
      <br />
      <br />
      <form action='#' onSubmit={handleSubmit}>
        <label htmlFor='name'>Enter your name: &nbsp;</label>
        <input id='name' alt='Name' type='text' />
        <button type='submit'>Click Me!</button>
      </form>
      <section id='greeting'>{greeting}</section>
    </main>
  );
};

export default App;
