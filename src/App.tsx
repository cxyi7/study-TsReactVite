import { useState } from 'react';
import { ReactComponent as ReactLogo } from '@/assets/svgs/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Header } from './components/header';
import { Body } from './components/body';
import { Footer } from './components/footer';
import React from 'react';
import fib from 'virtual:fib';
alert(`结果${fib(10)}`);

import env from 'virtual:env';
console.log(env);

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
          <ReactLogo />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
