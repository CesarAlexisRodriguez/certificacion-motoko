import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormJuego from './FormJuego';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/FormJuego",
    element: <FormJuego></FormJuego>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
