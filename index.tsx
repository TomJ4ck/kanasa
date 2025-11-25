
import React from 'react';
import ReactDOM from 'react-dom/client';
import MyApp from './pages/_app';
import Home from './pages/index';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// In a real Next.js app, routing handles which component to pass.
// Here we simulate the index route.
root.render(
  <React.StrictMode>
    <MyApp Component={Home} pageProps={{}} />
  </React.StrictMode>
);
