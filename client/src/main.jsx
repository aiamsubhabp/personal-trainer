import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ClientForm from './components/ClientForm.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/clientform',
    element: <ClientForm />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);