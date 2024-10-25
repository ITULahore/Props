import React,{useState} from "react";
import DynamicForm from "../Form";

import { Grid, Button, InputAdornment } from "@mui/material";



const MultiText = () => {
    const [field, setField] = useState({
        Name: '',
        label: '',
        type: 'text',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setField((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


const multiTextAddFormModal = {
    data: {
        features: {
        submission: [
          {
            title: 'Field Information',
            serverCommunication: {
              data: {
              },
              config: {

              },
              response: {
              },
            },
            parameters: {
                fields: [
                  {
                    name:   field.Name,
                    label: field.label,
                    type: field.type,
                    required: true,
                  },
                  {
                    name: 'Email',
                    label: 'Email',
                    type: 'multiText',
                    childFields: [],
                    required: true,
                  },
                  {
                    name: 'Phone',
                    label: 'Phone',
                    type: 'text',
                    required: true,
                  },
                  
                ]
              },
            permission: '<permission>',
            onAction: (formData) => { console.log('Submitting form...') },
            options: {
            },
          },
        ],
      },
    },
    config: {
      viewMode: {
        presentation: ['modalView'],
        mode: ["create"]
      },
      features: { submission: true },
    },
    appearance: {
      features: {
  
        submission: {
          button: [{
            type: "confirm",
            backgroundColor: '#007bff',
            color: '#fff',
            
          },
        
          ],
        },
  
      },
    },
  };


    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <DynamicForm form={multiTextAddFormModal} />
            </Grid>
        </Grid>
    );
}
