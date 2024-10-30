import React, { useEffect, useState } from 'react';

import Form from './Form';
import { Grid, Button, InputAdornment, Container, Box, Typography } from "@mui/material";
import JsonFormater from '../JsonFormatter/JsonFormatter';
import BasicTabs from "../Tabs/BasicTabs"


function FormBuilder() {

    const [currentStep, setCurrentStep] = useState(0);
    const [isNewStepModalOpen, setNewStepModalOpen] = useState(false);
    const [isNewFieldModalOpen, setNewFieldModalOpen] = useState(false)
    const [isNewSectionModalOpen, setNewSectionModalOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isMultiStep, setIsMultiStep] = useState(false)
    const [sectionIndex, setSectionIndex] = useState(0)


    const handleAddSagaCommunication = (formData) => {
        // Create the new serverCommunication object
        const newServerCommunication = {
            sagaCommunication: formData, // Add the formData here
        };
    
        // Update the generated props state
        setGeneratedProps((prevProps) => {
            const lastSubmissionIndex = prevProps.data.features.submission.length - 1; // Get the index of the last submission
    
            return {
                ...prevProps,
                data: {
                    ...prevProps.data,
                    features: {
                        ...prevProps.data.features,
                        submission: prevProps.data.features.submission.map((submission, index) => {
                            if (index === lastSubmissionIndex) {
                                // Modify only the last submission item
                                return {
                                    ...submission,
                                    serverCommunication: newServerCommunication, // Add new serverCommunication object
                                };
                            }
                            return submission; // Return other submissions unchanged
                        }),
                    },
                },
            };
        });
    };
    
    
    const handleAddStep = () => {
        setNewStepModalOpen(true);
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
                    ],
                    onAction: () => { console.log("Hello") }
                }
            ];

            console.log("Step added:", formData);

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
                                            type: "textField",
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
                                onClick: () => { setNewStepModalOpen(false) }
                            }
                        ],
                        onAction: (formData) => {
                            console.log("Hello", formData);
                            handleAddNewStepInForm(formData);
                        },
                    }
                ]
            },
        },
        config: {
            viewMode: {
                presentation: 'modalView',
                mode: "create"
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
            const currentFields = updatedSubmission[currentStep]?.sections[sectionIndex]?.parameters?.fields || [];
            const fieldExists = currentFields?.some(field => field.name === formData.fieldName);
            if (fieldExists) {
                console.warn("Field with this name already exists:", formData.fieldName);
                return prevState;
            }
            const newField = {
                type: formData.fieldType,
                name: formData.fieldName,
                label: formData.fieldLabel,
                required: formData.fieldRequired,
                disabled: formData.fieldDisabled,
                options: formData.fieldType === "select" || formData.fieldType === "radio"
                    ? [{ value: "Option 1", label: "Label 1" }]
                    : [],
                multiple: formData.fieldType === "file" ? formData.fileMultiple : false,
                minLength: formData.fieldType === "textField" ? formData.textMin : '',
                maxLength: formData.fieldType === "textField" ? formData.textMax : '',
                min: formData.fieldType === "number" ? formData.numberMin : '',
                max: formData.fieldType === "number" ? formData.numberMax : '',
                minWords: formData.fieldType === "textArea" ? formData.textAreaMin : '',
                maxWords: formData.fieldType === "textArea" ? formData.textAreaMax : '',
                min: formData.fieldType === "date" ? formData.dateMin : '',
                max: formData.fieldType === "date" ? formData.dateMax : '',
                min: formData.fieldType === "dateTime" ? formData.dateTimeMin : '',
                max: formData.fieldType === "dateTime" ? formData.dateTimeMax : '',
                dependant: formData.fieldDependant ? formData.fieldDependant : '',
                dependValue: formData.fieldDependValue ? formData.fieldDependValue : '',
                onValidation: formData.fieldValidation

            };

            // Add the new field to the current fields array
            const updatedFields = [...currentFields, newField];
            updatedSubmission[currentStep].sections[sectionIndex].parameters.fields = updatedFields;

            console.log("prevState:", prevState);

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

    const newFieldProps = {
        data: {
            features: {
                submission: [
                    {
                        title: "Add New Field",
                        sections: [
                            {
                                title: "New Field Parameters",
                                parameters: {
                                    fields: [
                                        {
                                            type: "textField",
                                            name: "fieldName",
                                            label: "Enter the name of the field",
                                            required: true,
                                        },
                                        {
                                            type: "textField",
                                            name: "fieldLabel",
                                            label: "Enter the label of the field",
                                            required: true,
                                        },
                                        {
                                            type: "select",
                                            name: "fieldType",
                                            options: [
                                                { value: "textField", label: "Text Field" },
                                                { value: "select", label: "Select" },
                                                { value: "multiSelect", label: "Multi Select" },
                                                { value: "number", label: "Number" },
                                                { value: "textArea", label: "Text Area" },
                                                { value: "file", label: "File" },
                                                { value: "checkbox", label: "Checkbox" },
                                                { value: "date", label: "Date" },
                                                { value: "time", label: "Time" },
                                                { value: "dateTime", label: "Date and Time" },
                                                { value: "color", label: "Color" },
                                                { value: "url", label: "URL" },
                                                { value: "range", label: "Range" },
                                                { value: "radio", label: "Radio (single Select Checkbox)" },
                                                { value: "password", label: "Password" },
                                            ],
                                            label: "Enter the type of the field",
                                            required: true,
                                        },
                                        {
                                            type: "multiSelect",
                                            name: "fieldValidation",
                                            options: [
                                                { value: "isValidText", label: "Text Validation" },
                                                { value: "isValidName", label: "Name Validation" },
                                                { value: "isEmail", label: "Email Validation" },
                                                { value: "isPhoneNumber", label: "Phone Number Validation" },
                                                { value: "isURL", label: "URL Validation" },
                                                { value: "isAlpha", label: "Alphabetical Validation" },
                                                { value: "isNumeric", label: "Numeric Validation" },
                                            ],
                                            label: "Select to add validation on the field",
                                            required: true,
                                        },
                                        {
                                            type: "checkbox",
                                            name: "fieldRequired",
                                            label: "Is the field required?",
                                        },
                                        {
                                            type: "checkbox",
                                            name: "fieldDisabled",
                                            label: "Is the field disabled?",
                                        },
                                    ]
                                }
                            },
                            {
                                title: "Field Configurations",
                                parameters: {
                                    fields: [
                                        {
                                            type: "checkbox",
                                            name: "fileMultiple",
                                            label: "Enable multiple File Upload?",
                                            dependant: 'fieldType',
                                            dependValue: 'file'
                                        },
                                        {
                                            type: 'number',
                                            name: 'textMin',
                                            label: "Minimum Value",
                                            dependant: 'fieldType',
                                            dependValue: 'textField',
                                        },
                                        {
                                            type: 'number',
                                            name: 'textMax',
                                            label: "Maximum Value",
                                            dependant: 'fieldType',
                                            dependValue: 'textField',
                                        },
                                        {
                                            type: 'number',
                                            name: 'numberMin',
                                            label: "Minimum Value",
                                            dependant: 'fieldType',
                                            dependValue: 'number',
                                        },
                                        {
                                            type: 'number',
                                            name: 'numberMax',
                                            label: "Maximum Value",
                                            dependant: 'fieldType',
                                            dependValue: 'number',
                                        },
                                        {
                                            type: 'number',
                                            name: 'textAreaMin',
                                            label: "Minimum Words",
                                            dependant: 'fieldType',
                                            dependValue: 'textArea',
                                        },
                                        {
                                            type: 'number',
                                            name: 'textAreaMax',
                                            label: "Maximum Words",
                                            dependant: 'fieldType',
                                            dependValue: 'textArea',
                                        },
                                        {
                                            type: 'date',
                                            name: 'dateMin',
                                            label: "Minimum Date",
                                            dependant: 'fieldType',
                                            dependValue: 'date',
                                        },
                                        {
                                            type: 'date',
                                            name: 'dateMax',
                                            label: "Maximum Date",
                                            dependant: 'fieldType',
                                            dependValue: 'date',
                                        },
                                        {
                                            type: 'dateTime',
                                            name: 'dateTimeMin',
                                            label: "Minimum Date and Time",
                                            dependant: 'fieldType',
                                            dependValue: 'dateTime',
                                        },
                                        {
                                            type: 'dateTime',
                                            name: 'dateTimeMax',
                                            label: "Maximum Date and Time",
                                            dependant: 'fieldType',
                                            dependValue: 'dateTime',
                                        }
                                    ]
                                }
                            },
                            {
                                title: "Dependancy",
                                parameters: {
                                    fields: [
                                        {
                                            type: 'textField',
                                            name: 'dependantField',
                                            label: 'Dependant Field',
                                        },
                                        {
                                            type: 'textField',
                                            name: 'dependantValue',
                                            label: 'Dependant Value',
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
                                onClick: () => { setNewFieldModalOpen(false) }
                            }
                        ],
                        onAction: (formData, index) => {
                            console.log("Form Data", formData);
                            handleAddNewFieldInForm(formData);
                        },
                    }
                ]
            }
        },
        config: {
            viewMode: {
                presentation: 'modalView',
                mode: "create"
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

    const handleAddNewSectionInForm = (formData) => {
        setGeneratedProps((prevState) => {
            const updatedSubmission = [...prevState.data.features.submission];
            const currentSections = updatedSubmission[currentStep]?.sections || [];

            // Construct the new section object
            const newSection = {
                title: formData.sectionName || "",
                parameters: {
                    fields: [],
                },
            };

            // Add the new section to the current sections array
            const updatedSections = [...currentSections, newSection];
            updatedSubmission[currentStep].sections = updatedSections;

            console.log("New section added:", newSection);

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

    const newSectionProps = {
        data: {
            features: {
                submission: [
                    {
                        title: "Add New Section",
                        sections: [
                            {
                                title: "New Section",
                                parameters: {
                                    fields: [
                                        {
                                            type: "textField",
                                            name: "sectionName",
                                            label: "Enter the Title of the Section",
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
                                onClick: () => { setNewSectionModalOpen(false) }
                            }
                        ],
                        onAction: (formData) => {
                            console.log("Hello", formData);
                            handleAddNewSectionInForm(formData);
                        },
                    }
                ]
            },
        },
        config: {
            viewMode: {
                presentation: 'modalView',
                mode: "create"
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

    const [generatedProps, setGeneratedProps] = useState({
        data: {
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
                    buttons: step.buttons.filter(button => button.type === 'close')
                }))
            }
        }
    };

    const handleAddField = (stepIndex, sectionIndex) => {
        setSectionIndex(sectionIndex)
        setCurrentStep(stepIndex);
        setNewFieldModalOpen(true);
    }

    const handleAddSection = (index) => {
        setCurrentStep(index);
        setNewSectionModalOpen(true);
    }

    const handleGenerateFormProps = (formData) => {
        setIsSubmitted(true)

        const presentationModes = formData.presentationModes;
        const viewModes = formData.viewModes;
        const multiStep = formData.multiStep;

        const firstTitle = formData.firstTitle;
        const firstSection = formData.firstSectionTitle;
        setIsMultiStep(multiStep)
        const updatedGeneratedProps = {
            data: {
                features: {
                    submission: [
                        {
                            title: firstTitle,
                            sections: [
                                {
                                    title: firstSection,
                                    parameters: {
                                        fields: [

                                        ]
                                    }
                                },
                            ],
                            buttons: [


                            ].filter(Boolean),

                            onAction: () => { console.log("Hello") },

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

    const JsonView = ({ generatedProps }) => {
        return (
            <Box
                sx={{
                    width: '100%', // Makes the component occupy full width
                    padding: 3,
                    marginTop: 3,
                    overflowX: 'auto', // Allows horizontal scrolling if content overflows
                }}
            >
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
                                            name: 'presentationModes',
                                            type: 'radio',
                                            options: [
                                                {
                                                    label: 'Form View',
                                                    value: 'formView'
                                                },
                                                {
                                                    label: 'Modal View',
                                                    value: 'modalView'
                                                },
                                            ],
                                            required: true
                                        },
                                    ],
                                },
                            },
                            {
                                title: "View Modes",
                                parameters: {
                                    fields: [
                                        {
                                            name: 'viewModes',
                                            type: 'radio',
                                            options: [
                                                {
                                                    value: 'create',
                                                    label: 'Create',
                                                },
                                                {
                                                    value: 'edit',
                                                    label: 'Edit',
                                                },
                                                {
                                                    value: 'view',
                                                    label: 'View',
                                                },
                                            ],
                                            required: true
                                        },
                                    ],
                                },
                            },
                            {
                                title: "Section Configuration",
                                parameters: {
                                    fields: [
                                        {
                                            name: "firstSectionTitle",
                                            label: "Title of First Section",
                                            type: "textField",
                                            required: true,
                                        }
                                    ]
                                }
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
                                        },
                                        {
                                            name: "firstTitle",
                                            label: "Title of First Step",
                                            type: "textField",
                                            required: false,

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
                        onAction: handleGenerateFormProps,

                    },
                ],
            },
        },
        config: {
            viewMode: {
                presentation: 'formView',
                mode: 'create'
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

    const handleDeleteField = (stepIndex, sectionIndex, fieldIndex) => {
        // Create a copy of the current form data to avoid direct state mutation
        const updatedData = { ...generatedProps.data };

        // Check if the specified step exists
        if (updatedData?.features?.submission?.[stepIndex]?.sections?.[sectionIndex]) {
            const sections = updatedData.features.submission[stepIndex].sections;

            // Remove the specified field from the section
            if (sections[sectionIndex].parameters.fields.length > fieldIndex) {
                sections[sectionIndex].parameters.fields.splice(fieldIndex, 1);
            }

            // Update the state with the new data
            setGeneratedProps(prevState => ({
                ...prevState,
                data: updatedData,
            }));
        }
    };

    const handleDeleteSection = (stepIndex, sectionIndex) => {
        const updatedSteps = [...generatedProps.data.features.submission];
        updatedSteps[stepIndex].sections.splice(sectionIndex, 1);
        setGeneratedProps((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                features: {
                    ...prev.data.features,
                    submission: updatedSteps,
                },
            },
        }));
    };
    const handleDeleteStep = (stepIndex) => {
        const updatedSteps = [...generatedProps.data.features.submission];
        updatedSteps.splice(stepIndex, 1);
        setGeneratedProps((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                features: {
                    ...prev.data.features,
                    submission: updatedSteps,
                },
            },
        }));
    };

    function config() {
        return (
            <>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Grid item xs={12}>
                        <Form
                            data={form.data}
                            config={form.config}
                            appearance={form.appearance}
                        />
                    </Grid>

                    {isSubmitted &&
                        (
                            <Grid item xs={12}>
                                <Typography
                                    sx={{
                                        color: "#3f51b2",
                                        fontWeight: "bold",
                                        textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                                        textAlign: 'center',
                                        mt: 2,
                                    }}
                                    variant="h4"
                                >
                                    Generated Form
                                </Typography>
                                <>
                                    {(isMultiStep && isSubmitted) && (
                                        <Grid item xs={12} sx={{ textAlign: 'center', mt: 4 }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#3f51b2",
                                                    color: "#fff",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        backgroundColor: "#303f9f",
                                                    },
                                                    borderRadius: 2,
                                                    padding: "8px 24px",
                                                }}
                                                onClick={handleAddStep}
                                            >
                                                Add Step
                                            </Button>
                                        </Grid>
                                    )}
                                    {isSubmitted && generatedProps?.data?.features?.submission?.map((step, stepIndex) => (
                                        <Grid key={stepIndex} item xs={12} sx={{ mt: 4, p: 3, boxShadow: "0px 3px 6px rgba(0,0,0,0.1)", borderRadius: 2, backgroundColor: "#f7f9fc" }}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ fontWeight: 'bold', textAlign: 'left', color: "#3f51b2" }}
                                                >
                                                    Step {stepIndex + 1}: {step.title}
                                                </Typography>


                                                {isMultiStep && (
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleDeleteStep(stepIndex)}
                                                        sx={{
                                                            color: "#d32f2f",
                                                            borderColor: "#d32f2f",
                                                            "&:hover": {
                                                                backgroundColor: "#ffebee",
                                                                borderColor: "#c62828",
                                                            },
                                                            fontWeight: "bold",
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        Delete Step
                                                    </Button>)}
                                            </Grid>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    mb: 3,
                                                    color: "#3f51b2",
                                                    borderColor: "#3f51b2",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        backgroundColor: "#e3f2fd",
                                                        borderColor: "#3f51b2",
                                                    },
                                                    borderRadius: 2,
                                                }}
                                                onClick={() => handleAddSection(stepIndex)}
                                            >
                                                Add Section
                                            </Button>
                                            {step?.sections?.map((section, sectionIndex) => (
                                                <Grid
                                                    key={sectionIndex}
                                                    item
                                                    xs={12}
                                                    sx={{
                                                        ml: 4,
                                                        mt: 3,
                                                        backgroundColor: "#ffffff",
                                                        p: 3,
                                                        borderRadius: 2,
                                                        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)"
                                                    }}
                                                >
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: 'bold',
                                                                color: "#3f51b2",
                                                                mb: 1
                                                            }}
                                                        >
                                                            Section {sectionIndex + 1}: {section.title}
                                                        </Typography>
                                                        <Button
                                                            variant="outlined"
                                                            color="error"
                                                            onClick={() => handleDeleteSection(stepIndex, sectionIndex)}
                                                            sx={{
                                                                mb: 2,
                                                                color: "#d32f2f",
                                                                borderColor: "#d32f2f",
                                                                "&:hover": {
                                                                    backgroundColor: "#ffebee",
                                                                    borderColor: "#c62828",
                                                                },
                                                                fontWeight: "bold",
                                                                borderRadius: 2,
                                                            }}
                                                        >
                                                            Delete Section
                                                        </Button>
                                                    </Grid>
                                                    <Button
                                                        variant="outlined"
                                                        sx={{
                                                            mt: 2,
                                                            color: "#3f51b2",
                                                            borderColor: "#3f51b2",
                                                            fontWeight: "bold",
                                                            "&:hover": {
                                                                backgroundColor: "#e3f2fd",
                                                                borderColor: "#3f51b2",
                                                            },
                                                            borderRadius: 2,
                                                        }}
                                                        onClick={() => handleAddField(stepIndex, sectionIndex)}
                                                    >
                                                        Add Field
                                                    </Button>
                                                    {section.parameters.fields.map((field, fieldIndex) => (
                                                        <Grid
                                                            key={fieldIndex}
                                                            container
                                                            alignItems="center"
                                                            sx={{
                                                                mt: 2,
                                                                padding: 1,
                                                                borderRadius: 1,
                                                                backgroundColor: "#f1f3f5",
                                                                width: '100%',
                                                            }}
                                                        >
                                                            <Grid item xs={4}>
                                                                <Typography sx={{ fontWeight: "medium", color: "#333", fontSize: "0.9rem" }}>
                                                                    {field.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography sx={{ color: "#555", fontSize: "0.9rem" }}>
                                                                    {field.label}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={4}>
                                                                <Typography sx={{ color: "#777", fontSize: "0.9rem" }}>
                                                                    {field.onValidation}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    color="error"
                                                                    onClick={() => handleDeleteField(stepIndex, sectionIndex, fieldIndex)}
                                                                    sx={{
                                                                        ml: 0,
                                                                        mt: 2,
                                                                        color: "#d32f2f",
                                                                        borderColor: "#d32f2f",
                                                                        "&:hover": {
                                                                            backgroundColor: "#ffebee",
                                                                            borderColor: "#c62828",
                                                                        },
                                                                        fontSize: "0.8rem",
                                                                    }}
                                                                >
                                                                    Delete Field
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    ))}

                                                </Grid>
                                            ))}
                                        </Grid>
                                    ))}
                                </>
                            </Grid>

                        )
                    }
                    {isNewFieldModalOpen && (
                        <Grid item xs={12}>
                            <Form
                                data={newFieldProps.data}
                                config={newFieldProps.config}
                                appearance={newFieldProps.appearance}
                            />
                        </Grid>
                    )}

                    {isNewStepModalOpen && (
                        <Grid item xs={12}>
                            <Form
                                data={newStepProps.data}
                                config={newStepProps.config}
                                appearance={newStepProps.appearance}
                            />
                        </Grid>
                    )}

                    {isNewSectionModalOpen && (
                        <Grid item xs={12}>
                            <Form
                                data={newSectionProps.data}
                                config={newSectionProps.config}
                                appearance={newSectionProps.appearance}
                            />
                        </Grid>
                    )}


                </Grid>
            </>
        );

    }

    function view() {
        return (
            <>
                <Grid
                    container
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '2rem'
                    }}
                >
                    <Grid item xs={12}>
                        <Form
                            data={generatedProps.data}
                            config={generatedProps.config}
                            appearance={generatedProps.appearance}
                        />
                    </Grid>

                </Grid>
            </>
        );
    }
    function json() {
        return (<>
            <Grid
                container
                sx={{
                    width: '100%',
                    height: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem'
                }}
            >
                <JsonView generatedProps={generatedProps} />

            </Grid>
        </>)
    }
    function api() {
        const apiFormProps = {
            data: {
                features: {
                    submission: [
                        {
                            title: "",
                            sections: [
                                {
                                    title: "",
                                    parameters: {
                                        fields: [
                                            {
                                                type: "textField",
                                                name: "apiUrl",
                                                label: "Enter the Url of the Api",
                                                required: true,
                                                childFields: [{}],
                                                options: [{}],
                                            },
                                            {
                                                type: "textField",
                                                name: "reduxAction",
                                                label: "Enter the Redux Action Type",
                                                required: true,
                                                childFields: [{}],
                                                options: [{}],
                                            },
                                            {
                                                type: "textField",
                                                name: "apiAction",
                                                label: "Enter Api Action type",
                                                required: true,
                                                childFields: [{}],
                                                options: [{}],
                                            },
                                            {
                                                type: "checkbox",
                                                name: "accesToken",
                                                label: "Will this api require Access token",
                                                required: true,
                                                childFields: [{}],
                                                options: [{}],
                                            },
                                            
                                            {

                                                name: 'requestType',
                                                label: "Choose the request type of this Api",
                                                type: 'radio',
                                                options: [
                                                    {
                                                        label: 'GET',
                                                        value: 'GET'
                                                    },
                                                    {
                                                        label: 'POST',
                                                        value: 'POST'
                                                    },
                                                    {
                                                        label: 'PUT',
                                                        value: 'PUT'
                                                    },
                                                    {
                                                        label: 'DELETE',
                                                        value: 'DELETE'
                                                    },
                                                ],
                                                required: true

                                            }
                                        ],
                                    },
                                },
                            ],
                            buttons: [
                                {
                                    type: "submit",
                                    label: "Submit"
                                }

                            ],
                            onAction: (formData) => {
                                handleAddSagaCommunication(formData)
                                console.log("FormData::::", formData)
                            }
                        },
                    ],
                },
            },

            config: {
                viewMode: {
                    presentation: "formView",
                    mode: "create"
                },
                features: {
                    submission: true
                }

            },
            appearance: {

            }
        }
        return (
            <>
                <Form
                    data={apiFormProps.data}
                    config={apiFormProps.config}
                    appearance={apiFormProps.appearance}
                />
            </>
        )
    }
    const tabsData = [
        {
            label: "configurations",
            content: config
        },
        {
            label: "View",
            content: view
        },
        {
            label: "JSON",
            content: json
        },
        {
            label: "Api",
            content: api
        },

    ]



    return (
        <Container maxWidth="lg" sx={{ padding: '2rem' }}>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <BasicTabs title="Form Builder" tabs={tabsData} />
                </Grid>


            </Grid>
        </Container>
    );

}

export default FormBuilder;
