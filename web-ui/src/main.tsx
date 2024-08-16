import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';

import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import './index.css'
import { AppSharedContextProvider } from './contexts/app-shared-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ appendTo: 'self', ripple: true }}  >
      <AppSharedContextProvider>
        <App />
      </AppSharedContextProvider>
    </PrimeReactProvider>
  </React.StrictMode>,
)
