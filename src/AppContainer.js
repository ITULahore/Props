// src/AppContainer.js
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';

import { ThemeProvider } from '@mui/material/styles';
import { Grid, Box, Button } from '@mui/material';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FrontEndDocumentation from './views/frontEndDocumentation';
import BackendDocumentation from './views/Backend/backendDocumentation';
import HomePage from './views/homePage';  // Import your HomePage component
import GeneratedObjectPage from './views/Backend/generatedObject';
import FormBuilder from './components/Form/FormBuilder';

const AppContainer = () => {
  


  return (
    <Router>
 < Grid item xs={12} sm={6} md={4} sx={{ marginTop: "30px" }} >
       
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frontend" element={<FrontEndDocumentation />} />
            <Route path="/backend" element={<BackendDocumentation />} />
            <Route path="/formGeneration" element={<FormBuilder />} />
            <Route path="/generated-object" element={<GeneratedObjectPage />} />
        </Routes>
    </Grid>
     
    </Router>
  );
};

export default AppContainer;
