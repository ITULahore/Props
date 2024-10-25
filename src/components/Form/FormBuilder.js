import React, { useState } from 'react';

import ADDform from './Form';
import { Grid, Button, InputAdornment, Box,Typography } from "@mui/material";
import JsonFormater from '../JsonFormatter/JsonFormatter';


function FormBuilder() {

    const [showNewFieldModal, setShowNewFieldModal] = useState(false)
    const [currentStep, setCurrentStep] = useState(0);
    const [title, setTitle] = useState("");
    const [showNewStepModal, setShowNewStepModal] = useState(false);


    const handleAddStep=()=>{
        setShowNewStepModal(true);
    }
    const handleAddNewStepInForm = (formData) => {
        setGeneratedProps((prevState) => {
            const updatedSubmission = [...prevState.data.features.submission];
            const updatedSteps = [
                ...updatedSubmission,
                {
                    title: formData.stepName,
                    sections: [
                        {
                            title: "",
                            parameters: {
                                fields: [

                                ]
                            }
                        },
                    ],
                    buttons: [
                        {
                            type: "add",
                            label: "Add Field",
                            onClick: (index) => { handleAddField(index) },
                        },
                    ],
                    onAction: () => { }
                }
            ];
       
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    features: {
                        ...prevState.data.features,
                        submission: updatedSteps,
                    },
                },
            };
        });
    }
    const handleFirstStepTitle = (formData) => {
        const updatedForm = {
            ...form,
            data: {
                ...form.data,
                features: {
                    ...form.data.features,
                    submission: form.data.features.submission.map((step, index) => {
                        return {
                            ...step,
                            sections: step.sections.map((section, secIndex) => {
                                if (secIndex === 2) {
                                        return {
                                            ...section,
                                            parameters: {
                                                ...section.parameters,
                                                fields: section.parameters.fields.map(field => 
                                                    field.name === "title"
                                                        ? { ...field, label: formData?"Enter the title of the first step":"Enter the title of the form" }
                                                        : field
                                                )
                                            }
                                    };
                                    
                                }
                                return section; // Return section unmodified if not targeting the right one
                            })
                        };
                    })
                }
            }
        };
    
        setForm(updatedForm);
    };
    
    
    const newFieldProps = {
        data: {
            features: {
                submission: [
                    {
                        title: "Add New Field",
                        sections: [
                            {
                                title: "New Field",
                                parameters: {
                                    fields: [
                                        {
                                            type: "text",
                                            name: "fieldName",
                                            label: "Enter the name of the field",
                                            required: true,
                                        },
                                        {
                                            type: "text",
                                            name: "fieldLabel",
                                            label: "Enter the label of the field",
                                            required: true,
                                        },
                                        {
                                            type: "select",
                                            name: "fieldType",
                                            options: [
                                                { value: "checkbox", label: "Checkbox" },
                                                { value: "text", label: "Text" },
                                                { value: "number", label: "Number" },
                                                { value: "email", label: "Email" },
                                                { value: "select", label: "Select" },
                                                { value: "multiSelect", label: "Multi Select" },
                                                { value: "multiText", label: "Multi Text" },
                                                { value: "time", label: "Time" },
                                                { value: "file", label: "File" },
                                            ],
                                            label: "Enter the type of the field",
                                            required: true,
                                        },
                                        {
                                            type: "checkbox",
                                            name: "fieldRequired",
                                            label: "Is the field required?",
                                            required: true,
                                        },
                                    ]
                                }
                            }
                        ],
                        buttons: [
                            {
                                type: "submit",
                                label: "Submit",
                            },
                            {
                                type: "close",
                                label: "Close",
                                onClick: () => { setShowNewFieldModal(false) }
                            }
                        ],
                        onAction: (formData, index) => {
                        
                            setShowNewFieldModal(false);
                            handleAddNewFieldInForm(formData);

                        },
                    }
                ]
            }
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
                    buttons: [
                        {
                            type: "close",
                            backgroundColor: "red",
                            color: '#fff',
                        },
                        {
                            type: "submit",
                            backgroundColor: "green",
                            color: '#fff',
                        },
                    ],
                },
            },

        },
    }
    const newStepProps = {
        data: {
            features: {
                submission: [
                    {
                        title: "Add New Step",
                        sections: [
                            {
                                title: "New Step",
                                parameters: {
                                    fields: [
                                        {
                                            type: "text",
                                            name: "stepName",
                                            label: "Enter the name of the step",
                                            required: true,
                                        },
                                    ]
                                }
                            }
                        ],
                        buttons: [
                            {
                                type: "submit",
                                label: "Submit",
                            },
                            {
                                type: "close",
                                label: "Close",
                                onClick: () => { setShowNewStepModal(false) }
                            }
                        ],
                        onAction: (formData) => {
                          
                            setShowNewStepModal(false);
                            handleAddNewStepInForm(formData);

                        },
                    }
                ]
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
                    buttons: [
                        {
                            type: "close",
                            backgroundColor: "red",
                            color: '#fff',
                        },
                        {
                            type: "submit",
                            backgroundColor: "green",
                            color: '#fff',
                        },
                    ],
                },
            },
        }
    }
    const handleAddNewFieldInForm = (formData) => {

      

    
        setGeneratedProps((prevState) => {
            const updatedSubmission = [...prevState.data.features.submission];
            const currentFields = updatedSubmission[currentStep]?.sections[0]?.parameters?.fields;
            const fieldExists = currentFields?.some(field => field.name === formData.fieldName);
            if (fieldExists) {
                return prevState; 
            }
            const updatedFields = [
                ...currentFields,
                {
                    type: formData.fieldType,
                    name: formData.fieldName,
                    label: formData.fieldLabel,
                    required: formData.fieldRequired,
                    childFields: formData.fieldType === "multiText" ? [] : [{}],
                    options: (formData.fieldType === "select" || formData.fieldType === "multiSelect") 
                    ? [{ value: "Option 1", label: "Label 1" }] 
                    : [{}]
                }
            ];
    
            updatedSubmission[currentStep].sections[0].parameters.fields = updatedFields;
    
     
    
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    features: {
                        ...prevState.data.features,
                        submission: updatedSubmission,
                    },
                },
            };
        });
    };


    const [generatedProps, setGeneratedProps] = useState({
        data: {
            features: {
                submission: [
                    {
                        title: title,
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
                        onAction: () => { }
                    }
                ]
            }
        },
        config: {
            viewMode: {
                presentation: [],
                mode: []
            },
            features: { submission: true },
        },
        appearance: {
        }
    });

    const generatedPropsWithoutButtons = {
        ...generatedProps,
        data: {
            ...generatedProps.data,
            features: {
                ...generatedProps.data.features,
                submission: generatedProps.data.features.submission.map((step) => ({
                    ...step,
                    buttons: [] 
                }))
            }
        }
    };
    const handleAddField = (index) => {
        setCurrentStep(index);
     
        setShowNewFieldModal(true);
    }
    const handleGenerateFormProps = (formData) => {

        const presentationModes = formData.formView ? ['formView'] : formData.modalView ? ['modalView'] : [];
        const viewModes = formData.create ? ['create'] : formData.edit ? ['edit'] : formData.view ? ['view'] : [];
        const multiStep = formData.multiStep;
        const updatedGeneratedProps = {
            data: {
                features: {
                    submission: [
                        {
                            title: title,
                            sections: [
                                {
                                    title: "",
                                    parameters: {
                                        fields: [
                                           
                                        ]
                                    }
                                },
                            ],
                            buttons: [
                                {
                                    type: "add",
                                    label: "Add Field",
                                    onClick: (index) => { handleAddField(index) },
                                },
                                multiStep ? {
                                    type: "add",
                                    label: "Add Step",
                                    onClick: (index) => { handleAddStep(index) }, // You can also pass different handlers for different buttons
                                } : null,
                            ].filter(Boolean), 

                            onAction: () => { }
                        }
                    ]
                }
            },
            config: {
                viewMode: {
                    presentation: presentationModes,
                    mode: viewModes,
                },
                features: { submission: true },
            },
            appearance: {
            }
        };
        setGeneratedProps(updatedGeneratedProps);


    }



    const DemoView = ({generatedProps}) => {
        return (
          <Box sx={{ p: 3, border: '1px solid grey', mt: 3 }}>
            <Typography variant="h6">Generated Props</Typography>
            <JsonFormater
              data={generatedProps.data}
              config={generatedProps.config}
              appearance={generatedProps.appearance}
            />
          </Box>
        );
      };
    


    const [form, setForm] = useState({
        data: {
            features: {
                submission: [
                    {
                        title: 'Configurations',
                        sections: [
                            {
                                title: "Presentation Modes",
                                parameters: {
                                    fields: [
                                        {
                                            name: "presentationModes",
                                            type: 'singleSelectionCheckbox',
                                            childFields: [
                                                {
                                                    name: 'formView',
                                                    label: 'Form View',
                                                    type: 'checkbox',
                                                    required: false,
                                                    validation: () => { },
                                                },
                                                {
                                                    name: 'modalView',
                                                    label: 'Modal View',
                                                    type: 'checkbox',
                                                    required: false,
                                                    validation: () => { },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                            {
                                title: "View Modes",
                                parameters: {
                                    fields: [
                                        {
                                            name: "viewModes",
                                            type: "singleSelectionCheckbox",
                                            childFields: [
                                                {
                                                    name: 'create',
                                                    label: 'Create',
                                                    type: 'checkbox',
                                                    required: false,
                                                    validation: () => { },
                                                },
                                                {
                                                    name: 'edit',
                                                    label: 'Edit',
                                                    type: 'checkbox',
                                                    required: false,
                                                    validation: () => { },
                                                },
                                                {
                                                    name: 'view',
                                                    label: 'View',
                                                    type: 'checkbox',
                                                    required: false,
                                                    validation: () => { },
                                                },
                                            ],
                                        },
                                    ],
                                },
                            },
                            {
                                title: "Multi Step Configuration",
                                parameters: {
                                    fields: [
                                        {
                                            name: "multiStep",
                                            label: "Do you want a multistep form?",
                                            type: "checkbox",
                                            required: false,
                                            onAction: (formData) => {
                                          
                                                handleFirstStepTitle(formData);
                                            },
                                            validation: () => { }
                                        },
                                        {
                                            name:"title",
                                            label:"Enter the title of the form",
                                            type:"text",
                                            onAction: (formData) => {
                                                setTitle(formData);
                                            },
                                            required:false,

                                        }
                                    ]
                                }
                            }
                        ],
                        buttons: [
                            {
                                type: "submit",
                                label: "Submit",
                            }
                        ],
                        onAction: (formData) => {
                          handleGenerateFormProps(formData);
                        }
                    },
                ],
            },
        },
        config: {
            viewMode: {
                presentation: ['formView',"demoView"],
                mode: ["create"]
            },
            features: { submission: true },
        },
        appearance: {
            features: {
                submission: {
                    button: [
                        {
                            type: "confirm",
                            backgroundColor: '#fff',
                            color: '#fff',
                        },
                    ],
                },
            },
        },
    });

    return (
        <Grid container spacing={3} padding={2} sx={{ ml: 10 }}>
            <Grid container spacing={2}>
                <Grid item xs={8} md={14}>
                    <ADDform
                        data={form.data}
                        config={form.config}
                        appearance={form.appearance}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} md={14}>
                <Grid sx={{ ml: 50 }}> <Typography variant="h3">Generated Form</Typography></Grid>
                <ADDform
                    data={generatedProps.data}
                    config={generatedProps.config}
                    appearance={generatedProps.appearance}
                />
            </Grid>
            {
                showNewFieldModal && (
                    <Grid item xs={12} md={12}>
                        <ADDform
                            data={newFieldProps.data}
                            config={newFieldProps.config}
                            appearance={newFieldProps.appearance}
                        />
                    </Grid>
                )
            }
            {
                showNewStepModal && (
                    <Grid item xs={12} md={12}>
                        <ADDform
                            data={newStepProps.data}
                            config={newStepProps.config}
                            appearance={newStepProps.appearance}
                        />
                    </Grid>
                )
            }
            {
                <DemoView generatedProps={generatedPropsWithoutButtons} />
            }
                
        </Grid>
    );
}

export default FormBuilder;
