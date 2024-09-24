import React from 'react';
import { createRoot } from 'react-dom/client';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DynamicContextProvider settings={{
      environmentId: process.env.REACT_APP_DYNAMIC_ENVIRONMENT_ID,
    }}>
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
);