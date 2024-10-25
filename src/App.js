import React from 'react';
import { Grid, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import FrontEndDocumentation from './views/frontEndDocumentation';
import BackendDocumentation from './views/Backend/backendDocumentation';
import HomePage from './views/homePage';  // Import your HomePage component
import GeneratedObjectPage from './views/Backend/generatedObject';


const App = () => {
   

    < Grid item xs={12} sm={6} md={4} sx={{ marginTop: "30px" }} >
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => {}}  // Navigate to the previous page
            >
                Go Back
            </Button>
        </Box>
        {/* <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/frontend" element={<FrontEndDocumentation />} />
            <Route path="/formGeneration" element={<FormBuilder />} />
            <Route path="/backend" element={<BackendDocumentation />} />
            <Route path="/generated-object" element={<GeneratedObjectPage />} />
        </Routes> */}
    </Grid>

};

export default App;
