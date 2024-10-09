import React,{useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CollapsibleDocPage from './DocumentationPage';
import { Button, Container, Grid, Typography } from '@mui/material';
import ComponentSelection from './componentSelection';

const App = () => {
const [selectedComponent, setSelectedComponent] = useState(null);

  const buttonsData = [
    {
      label: 'Listing Component',
      name:'Listing',
      background: 'linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)',
      onClick: () => setSelectedComponent("Listing"),
    },
    {
      label: 'Graph Component',
      name:'Graph',
      background: 'linear-gradient(90deg, #43C6AC 0%, #191654 100%)',
      onClick: () => setSelectedComponent("Graph"),
    },
    {
      label: 'Form Component',
      name:"Form",
      background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
      onClick: () => setSelectedComponent("Form"),
    },
  ];

return (
 < Grid item xs={12} sm={6} md={4}>
<ComponentSelection buttonsData={buttonsData} />
 {selectedComponent && <CollapsibleDocPage component={selectedComponent}/>}
</Grid>
);
};

export default App;
