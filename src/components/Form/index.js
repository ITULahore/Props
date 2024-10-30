import Form from "./Form";
import { Grid } from "@mui/material";

function FormDashboard() {
    const formProps={  data: {
        features: {
            submission: [
                {
                    title: '',
                    sections: [
                        {
                            title: "",
                            parameters: {
                                fields: [

                                ]
                            }
                        },


                    ],
                    buttons: [],
                    onAction: () => { console.log("Hello") }
                }
            ]
        }
    },
    config: {
        viewMode: {
            presentation: '',
            mode: ''
        },
        features: { submission: true },
    },
    appearance: {
    }}
    return (
        <Grid container spacing={3} padding={2}>
         <Form data={formProps.data} config={formProps.config} appearance={formProps.config} viewMode={"demoView"}></Form>
        </Grid> 
    );
}

export default FormDashboard;
