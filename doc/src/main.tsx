import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize mock service worker
async function prepare() {
  // if (import.meta.env.DEV) {
  //   const { worker } = await import('./lib/mockApi');
  //   return worker.start({
  //     onUnhandledRequest: 'bypass',
  //   });
  // }
  // return Promise.resolve();
}

prepare().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});