import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import  AppContainer  from './AppContainer';

import { ThemeProvider, CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
                <CssBaseline />
                <AppContainer />

  </React.StrictMode>
);
