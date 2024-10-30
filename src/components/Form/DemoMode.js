import FormBuilder from "./FormBuilder";
import { Grid } from "@mui/material";

function DemoMode() {



    console.log("DemoMode.js");
    return (
        <Grid container spacing={3} padding={2}>
            <FormBuilder></FormBuilder>
        </Grid> 
    );
}

export default DemoMode;
