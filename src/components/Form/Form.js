import React, { useEffect, Fragment, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    Radio,
    ListItemText,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    FormControlLabel,
    Card,
    Stepper,
    Step,
    StepLabel,
    List,
    ListItem,
    Link
} from '@mui/material';
import { Close } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear'; // For clear icon
import FileCopyIcon from '@mui/icons-material/FileCopy'; // For file copy icon
import DemoMode from "./DemoMode";

const Form = ({ data, config, appearance, viewMode }) => {

    const [openModal,setOpenModal]=useState(true)
    const { features: { submission } } = data;
    const onAction = submission[0].onAction;

    // Get the `onClick` of the first `close` button if it exists
    const closeButton = submission.find(step => step.buttons.some(btn => btn.type === 'close'));
    const closeButtonOnClick = closeButton?.buttons.find(btn => btn.type === 'close')?.onClick;

    const handleDialogClose = () => {
       setOpenModal(false)
      
    }
    ;
    const stepsData = submission.map((step) => ({
        title: step.title,
        sections: step.sections.map((section) => ({
            title: section.title,
            fields: section.parameters.fields,
        })),
    }));

    const { viewMode: { presentation, mode } } = config;
    console.log("config", config, "Presentation", presentation, "Mode", mode);
    const {
        submitButtonSX = {},
        nextButtonSX = {},
        previousButtonSX = {},
        formCardSX = {},
        dialogSX = {}
    } = appearance;

    let isModal = presentation === 'modalView' ? true : false;

    // Handle whether fields are disabled based on mode
    const isReadOnly = mode === 'view';
    const variant = isReadOnly ? "standard" : "outlined";
    const isRequired = (!isReadOnly);

    const initialFieldsData = [];
    stepsData.forEach(step => {
        let thisStep = [];
        step.sections.forEach(section => {
            thisStep.push({ title: section.title, fields: section.fields });
        });
        initialFieldsData.push(thisStep);
    });

    const [fields, setFields] = useState(initialFieldsData); // Replace initialFieldsData with your actual initial data

    useEffect(() => {
        const updatedFields = stepsData.map(step => {
            const thisStep = step.sections.map(section => ({
                title: section.title,
                fields: section.fields,
            }));
            return thisStep;
        });

        setFields(updatedFields);
    }, [data]);

    // Initialize formValues based on fields
    const initialFormValues = {};
    stepsData.forEach(step => {
        step.sections.forEach(section => {
            section.fields.forEach(field => {
                if (field.type === 'checkbox') {
                    initialFormValues[field.name] = config.viewMode.mode === 'create' ? false : field.checked || false;
                } else {
                    initialFormValues[field.name] = config.viewMode.mode === 'create' ? '' : field.value || '';
                }
            });
        });
    });

    const steps = submission.map((step) => `${step.title}`);

    const [formValues, setFormValues] = useState(initialFormValues);
    const [currentStep, setCurrentStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({}); // New state for errors

    const styles = {
        fileDetails: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        filePreview: {
            marginRight: '10px'
        },
        fileName: {
            fontWeight: 'bold'
        },
    };

    // Handle input changes
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        // Check if it's a multi-select
        if (type === 'checkbox') {
            // If it's a single checkbox, just set it to true or false
            setFormValues({
                ...formValues,
                [name]: checked, // Set checked state directly
            });
        }

        else {
            setFormValues({
                ...formValues,
                [name]: value,
            });

            // Clear error for the field when it changes
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        }

        // Handle the logic for number type fields
        if (type === 'number') {
            setFields(prevFields => {
                // Create a new copy of the fields
                const newFields = prevFields.map(step =>
                    step.map(section => ({
                        ...section,
                        fields: [...section.fields] // Create a shallow copy of the fields array
                    }))
                );

                newFields[currentStep].forEach((section, sectionIndex) => {
                    const objectToFind = section.fields.find(field => field.name === name);

                    if (objectToFind && objectToFind.repeatDependancy === true) {
                        const repeatFields = objectToFind.repeatFields;
                        let popFields = [];

                        repeatFields.forEach(f => {
                            let nameFind = f.name;
                            const matchingFields = section.fields.filter(field => field.name.startsWith(nameFind));
                            popFields.push(...matchingFields);
                        });

                        const popFieldIds = new Set(popFields.map(f => f.name));

                        // Update section.fields immutably
                        newFields[currentStep][sectionIndex].fields = section.fields.filter(field => !popFieldIds.has(field.name));
                        objectToFind.repeated = false; // Mark as not repeated
                    }
                });

                return newFields; // Return the new fields array
            });
        }

    };

    // File change handler
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const isMultiple = event.target.multiple;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: isMultiple
                ? [...(prevValues[name] || []), ...Array.from(files)] // Append new files
                : files, // Single file
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null, // Clear error
        }));
    };

    // Handle single file removal
    const handleRemoveFile = (fieldName, fileToRemove) => {
        setFormValues((prevValues) => {
            const updatedFiles = prevValues[fieldName].filter((file) => file.name !== fileToRemove.name);
            return {
                ...prevValues,
                [fieldName]: updatedFiles,
            };
        });
    };

    // Handle all file removal
    const handleRemoveAllFiles = (fieldName) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldName]: [], // Clear all files
        }));
    };

    // Validate current step fields
    const validateCurrentStep = () => {
        let valid = true;
        const newErrors = {};

        if (!isReadOnly) {
            // Validate each field in the current step
            fields[currentStep].forEach((section) => (
                section.fields.forEach((field) => {

                    const { name, type, required, minLength, maxLength, min, max, minWords, maxWords } = field;
                    const value = formValues[name] || '';

                    if (type === 'file' && required && (!value || value.length === 0)) {
                        newErrors[name] = 'Please select at least one file';
                        valid = false;
                    }

                    if (required && type === 'checkbox' && !value) {
                        newErrors[name] = 'This field is required';
                        valid = false;
                    }

                    // Check required fields
                    if (required && !value) {
                        newErrors[name] = 'This field is required';
                        valid = false;
                    }

                    // Check for specific field type validations
                    if (type === 'password') {
                        // Validate password length
                        if (minLength && value.length < minLength) {
                            newErrors[name] = `Minimum length is ${minLength}`;
                            valid = false;
                        }
                    }

                    // Check minLength
                    if (minLength && value.length < minLength) {
                        newErrors[name] = `Minimum length is ${minLength}`;
                        valid = false;
                    }

                    // Check maxLength
                    if (maxLength && value.length > maxLength) {
                        newErrors[name] = `Maximum length is ${maxLength}`;
                        valid = false;
                    }

                    // Check min
                    if (min !== undefined && Number(value) < min) {
                        newErrors[name] = `Minimum value is ${min}`;
                        valid = false;
                    }

                    // Check max
                    if (max !== undefined && Number(value) > max) {
                        newErrors[name] = `Maximum value is ${max}`;
                        valid = false;
                    }

                    // Check word count
                    if (type === 'textarea') {
                        const wordCount = value.trim().split(/\s+/).filter(word => word).length; // Count words
                        if (minWords !== undefined && wordCount < minWords) {
                            newErrors[name] = `Minimum word count is ${minWords}`;
                            valid = false;
                        }
                        if (maxWords !== undefined && wordCount > maxWords) {
                            newErrors[name] = `Maximum word count is ${maxWords}`;
                            valid = false;
                        }
                    }


                    // Additional validation for radio type
                    if (type === 'radio' && required && !formValues[name]) {
                        newErrors[name] = 'Please select an option';
                        valid = false;
                    }
                })
            ));
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateCurrentStep()) {

            //Handle form submission logic here (e.g., API calls)
            if (onAction) {
                try {
                    await onAction(formValues);
                }
                catch (error) {
                    console.error('Submission failed:', error);
                }
            }

            if (isModal === true) {
                handleDialogClose();
            }

            // Reset the 'repeated' flag for all fields with repeatDependancy
            fields.forEach((stepFields) => {
                stepFields.forEach((field) => {
                    if (field.repeatDependancy === true) {
                        field.repeated = false;  // Reset the repeated flag
                    }
                });
            });

            // Remove dynamically added fields from the current step after submission
            const newFields = fields.map((stepFields) =>
                stepFields.map((section) => ({
                    ...section,
                    fields: section.fields.filter((field) => !field.name.includes('_')),
                }))
            );

            setFields(newFields); // Update the state with the new fields structure

            setFormValues(initialFormValues); // Clear the form values
            setCurrentStep(0); // Reset to step 1

        }
    };

    // Next Step Handler
    const handleNextStep = () => {
        if (validateCurrentStep()) {
            if (currentStep < fields.length - 1) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    // Previous Step Handler
    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (viewMode == "demoView") {
        return (
            <DemoMode></DemoMode>
        );
    }
    else {
        const form = (


            <form noValidate onSubmit={handleSubmit}>
                {Array.isArray(fields[currentStep]) && fields[currentStep].map((thisSection, sectionIndex) => (
                    <Box key={sectionIndex} sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ mb: 1, mt: 3 }}>
                            {thisSection.title}
                        </Typography>
                        <Card sx={{ p: 2, borderRadius: "10px" }}> {/* Box for the section */}
                            {thisSection.fields.map((field, index) => {
                                // Check if field has a dependant field
                                if (field.dependant) {
                                    const dependantFieldValue = formValues[field.dependant];
                                    // If the dependent value does not match, skip rendering the field
                                    if (dependantFieldValue !== field.dependValue) {
                                        formValues[field.name] = '';
                                        return null;
                                    }
                                }
                                if (!isReadOnly) {
                                    //check if any fields needs to be repeated on it
                                    if (field.repeatDependancy === true) {
                                        const fieldsToRepeat = field.repeatFields;
                                        const repeatTimes = formValues[field.name];

                                        if (repeatTimes > 0 && (!('repeated' in field) || field.repeated === false)) {
                                            for (let i = 1; i <= repeatTimes; i++) {
                                                fieldsToRepeat.forEach((f, ind) => {
                                                    let fieldToAdd = { ...f };
                                                    fieldToAdd.name = f.name + '_' + i;
                                                    fieldToAdd.id = f.id + '_' + i;
                                                    fieldToAdd.label = f.label + ' ' + i;
                                                    // Use setFields to update the state and trigger re-render
                                                    setFields(prevFields => {
                                                        // Create a new copy of the fields
                                                        const newFields = [...prevFields];
                                                        // Find the current section to modify
                                                        const currentSection = newFields[currentStep][sectionIndex];
                                                        currentSection.fields.push(fieldToAdd); // Add the new field
                                                        return newFields; // Return the updated fields
                                                    });
                                                });
                                            }

                                            field.repeated = true;
                                        }
                                    }
                                }

                                switch (field.type) {
                                    case 'textField':
                                        return (
                                            <TextField
                                                key={field.name}
                                                fullWidth
                                                type='text'
                                                name={field.name}
                                                label={field.label}
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                margin="normal"
                                                onChange={handleInputChange}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message
                                                InputProps={{
                                                    inputProps: { minLength: field.minLength, maxLength: field.maxLength }
                                                }}
                                            />
                                        );
                                    case 'select':
                                        return (
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel sx={{ backgroundColor: 'white', padding: '0 4px' }}>
                                                    {field.label}
                                                </InputLabel>
                                                <Select
                                                    key={field.name}
                                                    name={field.name}
                                                    defaultValue={field.defaultValue}
                                                    value={formValues[field.name] || ''}
                                                    onChange={handleInputChange}
                                                    margin="normal"
                                                    variant={variant}
                                                    required={isRequired && field.required}
                                                    disabled={field.disabled || isReadOnly}
                                                    error={Boolean(errors[field.name])} // Show error if exists
                                                    helperText={errors[field.name]} // Show error message
                                                >
                                                    {field.options.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        );
                                    case 'multiSelect':
                                        return (
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel sx={{ backgroundColor: 'white', padding: '0 4px' }}>
                                                    {field.label}
                                                </InputLabel>
                                                <Select
                                                    key={field.name}
                                                    name={field.name}
                                                    multiple
                                                    value={formValues[field.name] || []} // Ensure it is an array
                                                    defaultValue={field.defaultValue}
                                                    onChange={handleInputChange}
                                                    margin="normal"
                                                    variant={variant}
                                                    required={isRequired && field.required}
                                                    disabled={field.disabled || isReadOnly}
                                                    error={Boolean(errors[field.name])} // Show error if exists
                                                    helperText={errors[field.name]} // Show error message
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {field.options.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            <Checkbox checked={formValues[field.name]?.includes(option.value)} />
                                                            <ListItemText primary={option.label} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        );
                                    case 'number':
                                        return (
                                            <TextField
                                                key={field.name}
                                                fullWidth
                                                type='number'
                                                name={field.name}
                                                label={field.label}
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                onChange={handleInputChange}
                                                margin="normal"
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message
                                                InputProps={{
                                                    inputProps: { min: field.min, max: field.max },
                                                }}
                                            />
                                        );
                                    case 'textArea':
                                        return (
                                            <TextField
                                                key={field.name}
                                                fullWidth
                                                type='text'
                                                name={field.name}
                                                label={field.label}
                                                multiline
                                                rows={field.rows || 4}
                                                onChange={handleInputChange}
                                                margin="normal"
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message
                                            />
                                        );
                                    case 'checkbox':
                                        return (
                                            <FormControl key={field.name} fullWidth margin="normal">
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={formValues[field.name] || false}
                                                            onChange={handleInputChange}
                                                            name={field.name}
                                                            required={isRequired && field.required}
                                                            disabled={field.disabled || isReadOnly}
                                                            sx={{
                                                                color: field.required && !formValues[field.name] ? '#ca3238' : 'default', // Change color if required and not checked
                                                                '&.Mui-checked': {
                                                                    color: field.required && !formValues[field.name] ? '#ca3238' : 'default',
                                                                },
                                                            }}
                                                        />
                                                    }
                                                    label={field.label}
                                                />
                                                {errors[field.name] && <Typography color="#ca3238" variant="caption">{errors[field.name]}</Typography>}
                                            </FormControl>
                                        );
                                    case 'color':
                                        return (
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel sx={{ top: '-8px', backgroundColor: 'white', padding: '0 3px', fontSize: '11px' }}>
                                                    {field.label}
                                                </InputLabel>
                                                <TextField
                                                    key={field.name}
                                                    name={field.name}
                                                    type="color"
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    margin="normal"
                                                    defaultValue={field.defaultValue}
                                                    value={formValues[field.name] || ''}
                                                    variant={variant}
                                                    disabled={field.disabled || isReadOnly}
                                                    required={isRequired && field.required}
                                                />
                                            </FormControl>
                                        );
                                    case 'url':
                                        return (
                                            <TextField
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                type="url"
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message

                                            />
                                        );
                                    case 'range':
                                        return (
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel sx={{ top: '-8px', backgroundColor: 'white', padding: '0 3px', fontSize: '11px' }}>
                                                    {field.label}
                                                </InputLabel>
                                                <TextField
                                                    key={field.name}
                                                    name={field.name}
                                                    type="range"
                                                    onChange={handleInputChange}
                                                    fullWidth
                                                    margin="normal"
                                                    defaultValue={field.defaultValue}
                                                    value={formValues[field.name] || ''}
                                                    disabled={field.disabled || isReadOnly}
                                                    required={isRequired && field.required}
                                                    variant={variant}
                                                />
                                            </FormControl>
                                        );
                                    case 'radio':
                                        return (
                                            <FormControl
                                                key={field.name}
                                                margin="normal"
                                                error={Boolean(errors[field.name])}
                                                disabled={field.disabled || isReadOnly}
                                            >
                                                <Typography>{field.label}</Typography>
                                                {field.options.map((option) => (
                                                    <FormControlLabel
                                                        key={option.value}
                                                        control={
                                                            <Radio
                                                                checked={formValues[field.name] === option.value}
                                                                onChange={handleInputChange}
                                                                name={field.name}
                                                                value={option.value}
                                                            />
                                                        }
                                                        label={option.label}
                                                    />
                                                ))}
                                                {/* Show error message if present */}
                                                {errors[field.name] && (
                                                    <Typography color="error" variant="caption">
                                                        {errors[field.name]}
                                                    </Typography>
                                                )}
                                            </FormControl>
                                        );
                                    case 'password':
                                        const isLastPasswordField = fields[currentStep].slice(index + 1).some(f => f.type === 'password');
                                        return (
                                            <FormControl key={field.name} fullWidth>
                                                <TextField
                                                    fullWidth
                                                    key={field.name}
                                                    type={showPassword ? "text" : "password"}
                                                    name={field.name}
                                                    label={field.label}
                                                    onChange={handleInputChange}
                                                    defaultValue={field.defaultValue}
                                                    value={formValues[field.name] || ''}
                                                    margin="normal"
                                                    variant={variant}
                                                    required={isRequired && field.required} s
                                                    disabled={field.disabled || isReadOnly}
                                                    error={Boolean(errors[field.name])} // Show error if exists
                                                    helperText={errors[field.name]} // Show error message

                                                />
                                                {/* Show Password Checkbox */}
                                                {!isLastPasswordField && (
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={showPassword}
                                                                onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                                                            />
                                                        }
                                                        label="Show Password" // Checkbox label
                                                    />
                                                )}
                                            </FormControl>
                                        );
                                    case 'time':
                                        return (
                                            <TextField
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                InputLabelProps={{
                                                    shrink: true, // To keep the label in the correct position when time is selected
                                                }}
                                                type="time"
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message

                                            />
                                        );
                                    case 'date':
                                        const today = new Date().toISOString().split('T')[0]; // Get today's date
                                        const minDate = field.min === 'today' ? today : field.min; // Dynamic minimum date
                                        const maxDate = field.max === 'today' ? today : field.max; // Dynamic maximum date
                                        return (
                                            <TextField
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                InputLabelProps={{
                                                    shrink: true, // To keep the label in the correct position when time is selected
                                                }}
                                                type="date"
                                                inputProps={{
                                                    min: minDate, // Minimum date set to today
                                                    max: maxDate, // Set max date as December 31, 2024
                                                }}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message

                                            />
                                        );
                                    case 'dateTime':
                                        const today1 = new Date().toISOString().slice(0, 16); // Get today's date
                                        const minDate1 = field.min === 'today' ? today1 : field.min; // Dynamic minimum date
                                        const maxDate1 = field.max === 'today' ? today1 : field.max; // Dynamic maximum date
                                        return (
                                            <TextField
                                                key={field.name}
                                                name={field.name}
                                                label={field.label}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                type="datetime-local"
                                                inputProps={{
                                                    min: minDate1,
                                                    max: maxDate1,
                                                }}
                                                onChange={handleInputChange}
                                                fullWidth
                                                margin="normal"
                                                defaultValue={field.defaultValue}
                                                value={formValues[field.name] || ''}
                                                variant={variant}
                                                required={isRequired && field.required}
                                                disabled={field.disabled || isReadOnly}
                                                error={Boolean(errors[field.name])} // Show error if exists
                                                helperText={errors[field.name]} // Show error message
                                            />
                                        );
                                    case 'file':
                                        return (
                                            <FormControl key={field.name} fullWidth margin="normal">
                                                <Typography>{field.label}</Typography>

                                                <Card
                                                    sx={{
                                                        boxShadow: "none",
                                                        borderRadius: "10px",
                                                        p: "25px",
                                                        mb: "15px",
                                                        border: "2px dashed #ccc",  // Dashed border
                                                        position: "relative",  // For positioning the label
                                                    }}
                                                >

                                                    {/* File Input and Box */}
                                                    <input
                                                        type="file"
                                                        id={field.name}
                                                        name={field.name}
                                                        onChange={handleFileChange}
                                                        multiple={field.multiple}
                                                        disabled={field.disabled || isReadOnly}
                                                        required={isRequired && field.required}
                                                        error={Boolean(errors[field.name])} // Show error if exists
                                                        helperText={errors[field.name]} // Show error message

                                                        hidden
                                                    />
                                                    <Box
                                                        onClick={() => document.getElementById(field.name).click()}
                                                        className={styles.dropzone}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: ["column", "column", "row"],
                                                                alignItems: "center",
                                                            }}
                                                        >
                                                            <Link
                                                                sx={{ textDecoration: "none", color: "inherit" }}
                                                                href="/"
                                                                onClick={(e) => e.preventDefault()}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                        textAlign: ["center", "center", "inherit"],
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="h6"
                                                                        mb={1}
                                                                        sx={{ paddingTop: "10px" }}
                                                                    >
                                                                        Click to select files.
                                                                    </Typography>
                                                                </Box>
                                                            </Link>
                                                        </Box>
                                                    </Box>

                                                    {/* Display Selected Files */}
                                                    {formValues[field.name] && formValues[field.name].length > 0 && (
                                                        <Fragment>
                                                            <List>
                                                                {Array.from(formValues[field.name]).map((file, index) => (
                                                                    <ListItem
                                                                        key={index}
                                                                        sx={{
                                                                            border: "1px solid #eee",
                                                                            justifyContent: "space-between",
                                                                            mt: "10px",
                                                                            mb: "10px",
                                                                        }}
                                                                        className="dark-border"
                                                                    >
                                                                        <div className={styles.fileDetails}>
                                                                            <div className={styles.filePreview}>
                                                                                {file.type.startsWith("image") ? (
                                                                                    <img
                                                                                        width={38}
                                                                                        alt={file.name}
                                                                                        src={URL.createObjectURL(file)}
                                                                                    />
                                                                                ) : (
                                                                                    <FileCopyIcon />
                                                                                )}
                                                                            </div>
                                                                            <div>
                                                                                <Typography className={styles.fileName}>
                                                                                    {file.name}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                        <IconButton onClick={() => handleRemoveFile(field.name, file)}>
                                                                            <ClearIcon />
                                                                        </IconButton>
                                                                    </ListItem>
                                                                ))}
                                                            </List>
                                                            <Button
                                                                color="error"
                                                                variant="contained"
                                                                onClick={() => handleRemoveAllFiles(field.name)}
                                                                sx={{
                                                                    textTransform: "capitalize",
                                                                    color: "#fff !important",
                                                                }}
                                                            >
                                                                Remove All
                                                            </Button>
                                                        </Fragment>
                                                    )}
                                                </Card>
                                                {/* Show error message if present */}
                                                {errors[field.name] && (
                                                    <Typography color="error" variant="caption">
                                                        {errors[field.name]}
                                                    </Typography>
                                                )}
                                            </FormControl>

                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </Card>
                    </Box>
                ))}

                <Box display="flex" justifyContent="space-between" marginTop={2}>
                    {steps.length > 1 && (
                        <>
                            <Button variant="outlined" onClick={handlePrevStep} disabled={currentStep === 0} sx={previousButtonSX}>
                                Previous
                            </Button>
                            <Button variant="contained" onClick={handleNextStep} disabled={currentStep >= fields.length - 1} sx={nextButtonSX}>
                                Next
                            </Button>
                            {currentStep === fields.length - 1 && submission[currentStep]?.buttons?.map((btn, index) => (
                                btn.type === 'submit' ? (
                                    <Button
                                        sx={submitButtonSX}
                                        key={index}
                                        variant="contained"
                                        type="submit"
                                    >
                                        {btn?.label}
                                    </Button>
                                ) : null
                            ))}
                        </>
                    )}
                    {steps.length === 1 && submission[currentStep]?.buttons?.map((btn, index) => (
                        btn.type === 'submit' ? (
                            <Button
                                sx={submitButtonSX}
                                key={index}
                                variant="contained"
                                type="submit"
                                fullWidth
                            >
                                {btn?.label}
                            </Button>
                        ) : null
                    ))}
                </Box>
                <Box display='flex' justifyContent="space-between" marginTop={2}>
                    {submission[currentStep]?.buttons?.map((btn, index) => (
                        btn.type === 'submit' || btn.type === 'close' ? null : (
                            <Button
                                key={index}
                                variant="contained"
                                style={{
                                    backgroundColor: appearance?.features?.submission?.buttons?.find(bt => btn.type == btn.type).backgroundColor ? appearance?.features?.submission?.buttons?.find(bt => bt.type == btn.type)?.backgroundColor : " ",
                                    color: appearance?.features?.submission?.buttons?.find(bt => btn.type == btn.type).color || "white"
                                    , margin: '5px'
                                }}
                                onClick={() => {
                                    btn.onClick(currentStep);
                                }}
                            >
                                {btn?.label}
                            </Button>
                        )
                    ))}
                </Box>
            </form>
        );

        if (isModal === true) {
            return (
                <>
                <Dialog
                    open={openModal}
                    onClose={handleDialogClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', ...dialogSX }}>
                        <IconButton onClick={handleDialogClose}>
                            <Close />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers sx={{ ...dialogSX }}>
                        <Box sx={{ width: '100%', marginTop: 2 }}>
                            {steps.length > 1 && (
                                <>
                                    <Stepper activeStep={currentStep} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </>
                            )}
                            {form}
                        </Box>
                    </DialogContent>
                </Dialog>
             
                    <Button
  variant="outlined"
  color="primary"
  onClick={() => { setOpenModal(true); }}
  sx={{
    ml: 0,
    mt: 2,
    px: 3,
    py: 1,
    color: "#fff",
    borderColor: "transparent",
    background: "linear-gradient(90deg, #2196f3 0%, #1e88e5 100%)",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    boxShadow: "0px 4px 12px rgba(33, 150, 243, 0.4)",
    "&:hover": {
      background: "linear-gradient(90deg, #64b5f6 0%, #42a5f5 100%)",
      boxShadow: "0px 6px 16px rgba(33, 150, 243, 0.6)",
      transform: "scale(1.02)",
    },
    "&:active": {
      boxShadow: "0px 4px 8px rgba(33, 150, 243, 0.3)",
      transform: "scale(1)",
    },
    transition: "all 0.3s ease",
  }}
>
  Open Modal
</Button>


                </>
            )
            
            
        }
        else {
            return (
                <Card
                    sx={{ padding: '24px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '50px', marginLeft: "60px", marginBottom: '50px', ...formCardSX, }}
                >
                    {steps.length > 1 && (
                        <>

                            <Stepper activeStep={currentStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                        </>
                    )}
                  
                        
                            { form }
                        

                </Card>
            );
        }


    }
}



export default Form;
