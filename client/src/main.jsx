// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createBrowserRouter, RouterProvider, BrowserRouter } from 'react-router-dom';
// import App from './App.jsx';
// import ClientForm from './components/ClientForm.jsx';
// import WorkoutForm from './components/WorkoutForm.jsx';
// import './index.css';
// import SessionForm from './components/SessionForm.jsx';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />
//   },
//   {
//     path: '/clientform',
//     element: <ClientForm />
//   },
//   {
//     path: '/workoutform',
//     element: <WorkoutForm />
//   },
//   {
//     path: '/sessionform',
//     element: <SessionForm />
//   }

// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );

// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from './App.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)