import React,{useState} from "react";
import { Grid,Box,Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import ComponentSelection from "../componentSelection";
import CollapsibleDocPage from "../DocumentationPage";

function FrontEndDocumentation() {
    const [selectedComponent, setSelectedComponent] = useState(null); 
    const buttonsData = [
      {
        label: 'Listing Component',
        name:'Listing',
        background: 'linear-gradient(90deg, #8E2DE2 0%, #4A00E0 100%)',
        onClick: () =>setSelectedComponent("Listing"),
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
    const navigate=useNavigate();
return (
    < Grid item xs={12} sm={6} md={4}>
           <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(-1)}  // Navigate to the previous page
              >
                Go Back
              </Button>
            </Box>
   <ComponentSelection buttonsData={buttonsData}  />
    { selectedComponent && <CollapsibleDocPage component={selectedComponent}/>}
   </Grid>
   );
}
export default FrontEndDocumentation;