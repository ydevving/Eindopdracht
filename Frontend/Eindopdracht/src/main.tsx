import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import Session from './utilities/Session.ts';

console.log("This runs first i suppose??");

// Automatically logs in as 'admin'
Session.instance.testInitialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
