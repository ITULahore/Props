import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Switch,
    TextField,
    Typography,
} from '@mui/material';

function ConfigPage({ config }) {
    const [isMultiStep, setIsMultiStep] = useState(false); // Controls multi-step mode
    const [isParameterEnabled, setIsParameterEnabled] = useState(true); // Parameter section toggle
    const [isValidationEnabled, setIsValidationEnabled] = useState(true); // Validation section toggle

    const [steps, setSteps] = useState([
        {
            name: '',
            parameters: [],
            validation: [],
        },
    ]);

    const handleStepChange = (index, event) => {
        const newSteps = [...steps];
        newSteps[index].name = event.target.value;
        setSteps(newSteps);
    };

    const handleAddStep = () => {
        setSteps([
            ...steps,
            {
                name: '',
                parameters: [],
                validation: [],
            },
        ]);
    };

    const handleRemoveStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
    };

    const handleAddParameter = (index) => {
        const newSteps = [...steps];
        newSteps[index].parameters.push({ name: '', validation: '', required: false });
        setSteps(newSteps);
    };

    const handleRemoveParameter = (stepIndex, paramIndex) => {
        const newSteps = [...steps];
        newSteps[stepIndex].parameters.splice(paramIndex, 1);
        setSteps(newSteps);
    };

    const handleAddValidation = (index) => {
        const newSteps = [...steps];
        newSteps[index].validation.push({ type: '', message: '' });
        setSteps(newSteps);
    };

    const handleRemoveValidation = (stepIndex, valIndex) => {
        const newSteps = [...steps];
        newSteps[stepIndex].validation.splice(valIndex, 1);
        setSteps(newSteps);
    };

    const handleParameterChange = (stepIndex, paramIndex, event) => {
        const newSteps = [...steps];
        newSteps[stepIndex].parameters[paramIndex][event.target.name] = event.target.value;
        setSteps(newSteps);
    };

    const handleValidationChange = (stepIndex, valIndex, event) => {
        const newSteps = [...steps];
        newSteps[stepIndex].validation[valIndex][event.target.name] = event.target.value;
        setSteps(newSteps);
    };

    const handleGenerate = () => {
        console.log(steps); // Replace with actual API generation logic
    };

    return (
        <Grid container sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
            {/* Go Back Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => window.history.back()} // Navigate to the previous page
                >
                    Go Back
                </Button>
            </Box>

            {/* Main Configuration Section */}
            <Box sx={{ padding: 4, minHeight: "100vh" }}>
                <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        API Configuration Settings
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />

                    {/* Configuration Options */}
                    <Grid container spacing={2}>
                        {/* Toggle for Multi-Step Configuration */}
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isMultiStep}
                                        onChange={() => setIsMultiStep(!isMultiStep)}
                                        color="primary"
                                    />
                                }
                                label="Enable Multi-Step Configuration"
                                sx={{ justifyContent: "space-between" }}
                            />
                        </Grid>

                        {/* Toggle for Parameters Section */}
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isParameterEnabled}
                                        onChange={() => setIsParameterEnabled(!isParameterEnabled)}
                                        color="primary"
                                    />
                                }
                                label="Enable Parameters Section"
                                sx={{ justifyContent: "space-between" }}
                            />
                        </Grid>

                        {/* Toggle for Validation Section */}
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={isValidationEnabled}
                                        onChange={() => setIsValidationEnabled(!isValidationEnabled)}
                                        color="primary"
                                    />
                                }
                                label="Enable Validation Section"
                                sx={{ justifyContent: "space-between" }}
                            />
                        </Grid>
                    </Grid>

                    {/* Multi-Step Section */}
                    {isMultiStep && (
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h6" gutterBottom>
                                API Step Configuration
                            </Typography>
                            <Divider sx={{ marginBottom: 2 }} />

                            {/* Add Step Button */}
                            <Button
                                variant="outlined"
                                onClick={handleAddStep}
                                sx={{ marginBottom: 2 }}
                            >
                                Add Step
                            </Button>

                            {/* Render Steps */}
                            {steps.map((step, index) => (
                                <Box key={index} sx={{ marginBottom: 4, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                    {/* Step Title and Remove Button */}
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h6">{`Step ${index + 1}`}</Typography>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleRemoveStep(index)}
                                        >
                                            Remove Step
                                        </Button>
                                    </Box>

                                    {/* Parameters Section (conditional) */}
                                    {isParameterEnabled && (
                                        <Box sx={{ marginTop: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Parameters for this Step
                                            </Typography>
                                            {step.parameters.map((param, paramIndex) => (
                                                <Box key={paramIndex} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                    <TextField
                                                        label="Parameter Name"
                                                        variant="outlined"
                                                        name="name"
                                                        value={param.name}
                                                        onChange={(event) => handleParameterChange(index, paramIndex, event)}
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    <TextField
                                                        label="Validation"
                                                        variant="outlined"
                                                        name="validation"
                                                        value={param.validation}
                                                        onChange={(event) => handleParameterChange(index, paramIndex, event)}
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={param.required}
                                                                onChange={() => {
                                                                    const newSteps = [...steps];
                                                                    newSteps[index].parameters[paramIndex].required = !param.required;
                                                                    setSteps(newSteps);
                                                                }}
                                                            />
                                                        }
                                                        label="Required"
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleRemoveParameter(index, paramIndex)}
                                                        sx={{ marginLeft: 1 }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            ))}
                                            <Button variant="outlined" onClick={() => handleAddParameter(index)} sx={{ marginTop: 2 }}>
                                                Add Parameter
                                            </Button>
                                        </Box>
                                    )}

                                    {/* Validation Section (conditional) */}
                                    {isValidationEnabled && (
                                        <Box sx={{ marginTop: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom>
                                                Validation Rules for this Step
                                            </Typography>
                                            {step.validation.map((val, valIndex) => (
                                                <Box key={valIndex} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                                                    <TextField
                                                        label="Validation Type"
                                                        variant="outlined"
                                                        name="type"
                                                        value={val.type}
                                                        onChange={(event) => handleValidationChange(index, valIndex, event)}
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    <TextField
                                                        label="Error Message"
                                                        variant="outlined"
                                                        name="message"
                                                        value={val.message}
                                                        onChange={(event) => handleValidationChange(index, valIndex, event)}
                                                        sx={{ marginRight: 1 }}
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => handleRemoveValidation(index, valIndex)}
                                                        sx={{ marginLeft: 1 }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Box>
                                            ))}
                                            <Button variant="outlined" onClick={() => handleAddValidation(index)} sx={{ marginTop: 2 }}>
                                                Add Validation Rule
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Generate Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Button variant="contained" color="primary" onClick={handleGenerate}>
                            Generate Configuration
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Grid>
    );
}

export default ConfigPage;
