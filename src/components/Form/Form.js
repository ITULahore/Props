import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Step, StepLabel, Typography, Grid, IconButton, Select, MenuItem, Checkbox, Chip, FormControlLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MultipleSelectChip from './AdvancedElements/MultipleSelectChip';
import MultiSelect from './AdvancedElements/MultiSelect';
import FileInput from './FileUploader/UploadMultipleFiles';
import EditorArea from './EditorArea';

import SelectInput from "./Select/AutoWidth"

import Stepper from '../Stepper/stepper';
const DynamicForm = ({ data, config, appearance }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [_, setRerender] = useState(false);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { submission } = data?.features || {};
  const { presentation } = config.viewMode || {}
  const [isModalOpen, setIsModalOpen] = useState(presentation?.includes('modalView'));


  const handleChange = (e, field) => {

    setFormData({ ...formData, [field.name]: e.target.value });
    setFormErrors({ ...formErrors, [field.name]: '' });
    if (field.onAction) {
      field.onAction(e.target.value,currentStep)
    }
  };
  const handleCheckboxSelection = (e, field) => {
    const { checked } = e.target;


    setFormData((prevState) => ({
      ...prevState,
      [field.name]: checked,
    }));


    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field.name]: '',
    }));


    if (field.onAction) {
      field.onAction(checked);
    }
  };

  const handleSingleSelectionChange = (e, field, selectedName) => {
    const updatedFormData = {};

    field.childFields.forEach((childField) => {
      updatedFormData[childField.name] = childField.name === selectedName ? e.target.checked : false;
    });

    setFormData({ ...formData, ...updatedFormData });
    setFormErrors({ ...formErrors, [field.name]: '' });


  };
  const handleMultiSelectChange = (e, field) => {
    const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
    setFormData({ ...formData, [field.name]: value });
    setFormErrors({ ...formErrors, [field.name]: '' });

  };


  const validateFields = () => {


    if (!presentation.includes('demoView')) {
   
        const fields = submission[currentStep].sections[0].parameters.fields;
    
        let errors = {};
        let isValid = true;

        for (const field of fields) {
            if (field.required && !formData[field.name]) {
                errors[field.name] = `${field.name} is required.`;
                isValid = false; // Mark as invalid if required field is empty
            }

            if (field.type === 'email' && formData[field.name]) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData[field.name])) {
                    errors[field.name] = 'Invalid email address.';
                    isValid = false; // Mark as invalid if email format is incorrect
                }
            }
        }

        setFormErrors(errors);
        return isValid;
    } else {
      
        return true; // Return true if `demoView` is in `presentation`
    }
};
  const handleSubmitButton=()=>{
    if (validateFields()) {
      handleSubmit();
    }
  }

  const handleNextStep = (btn) => {
    if (validateFields()) {
      if (currentStep <submission.length - 1) {
        setCurrentStep(currentStep + 1);
      }
      else{
        submission[currentStep].onAction(formData);
        setCurrentStep(currentStep + 1);
        if (btn.onClick) {
          btn.onClick();
        }

        }
      }
    }

  // Handle Previous Step
  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle Form Submission
  const handleSubmit = () => {
    // const currentFeature = submission[currentStep];
    // const { sagaCommunication } = currentFeature.serverCommunication.data;

    // // Post API Request
    // fetch(sagaCommunication.apiUrl, {
    //   method: sagaCommunication.requestType,
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then(sagaCommunication.onSuccess)
    //   .catch(sagaCommunication.onFailure);

    submission[currentStep].onAction(formData);
  };


  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const addMultiTextField = (fields) => {
    const newField = { name: `${fields.name}_${fields.childFields.length + 1}`, type: 'text', required: false,label:`${fields.name}_${fields.childFields.length + 1}` };
    fields.childFields.push(newField);
    setRerender(prev => !prev);
  };
  const renderFields = (fields) => {
    return fields?.map((field) => {
      switch (field.type) {
        case 'multiChip':
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <MultipleSelectChip
                label={field.label}
                value={formData[field.name] || []}
                onChange={(e) => handleChange(e, field)}
                fullWidth
              />
            </Box>
          );
        case 'multiSelect':
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <MultiSelect
                label={field.label}
                value={formData[field.name] || []}
                onChange={(e) => handleMultiSelectChange(e, field)}
                fullWidth
              />
            </Box>
          );
        case "select":
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <SelectInput
                label={field.label}
                value={formData[field.name] || []}
                items={field.options}
                sx={{}}
                onChange={(e) => { handleChange(e, field) }}
              />
            </Box>
          );
        case 'file':
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <FileInput
                label={field.label}
                onChange={(e) => handleChange(e, field)}
                fullWidth
              />
            </Box>
          );
        case 'editor':
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <EditorArea
                label={field.label}
                value={formData[field.name] || []}
                onChange={(e) => handleChange(e, field)}
                fullWidth
              />
            </Box>
          );
        case "multiText":
          return (

            <Box key={field.name} sx={{ mb: 2 }}>
              <Button onClick={() => { addMultiTextField(field) }}>
                Add Field
              </Button>
              <TextField
                label={field.label}
                required={field.required}
                type={field.type || 'text'}
                onChange={(e) => handleChange(e, field)}
                fullWidth
                margin="normal"
                error={!!formErrors[field.name]}
                helperText={formErrors[field.name]}
                multiline
                rows={4}
              />

              {field.childFields.map((childField, index) => (
                <TextField
                  key={index}
                  label={childField.label}
                  required={childField.required}
                  type={childField.type || 'text'}
                  onChange={(e) => handleChange(e, childField)}
                  fullWidth
                  margin="normal"
                  error={!!formErrors[childField.name]}
                  helperText={formErrors[childField.name]}
                />
              ))}
            </Box>
          );

        case 'checkbox':
          return (
            <Box key={field.name} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                {field.label}
              </Typography>

              <Checkbox
                value={formData[field.name] || []}
                onChange={(e) => handleCheckboxSelection(e, field)}
              />
            </Box>
          );
        case 'singleSelectionCheckbox':
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {field.label}
              </Typography>
              {field.childFields.map((childField) => (
                <FormControlLabel
                  key={childField.name}
                  control={
                    <Checkbox
                      checked={formData[childField.name] || false}
                      onChange={(e) => {
                        handleSingleSelectionChange(e, field, childField.name);
                      }}
                      fullWidth
                    />
                  }
                  label={<Typography variant="body1">{childField.label}</Typography>}
                />
              ))}
            </Box>
          );
        default:
          return (
            <Box key={field.name} sx={{ mb: 2 }}>
              <TextField
                label={field.label}
                required={field.required}
                type={field.type || 'text'}
                onChange={(e) => handleChange(e, field)}
                fullWidth
                margin="normal"
                error={!!formErrors[field.name]}
                helperText={formErrors[field.name]}
              />
            </Box>
          );
      }
    });
  };

  // Render Stepper if multi-step form
  const renderStepper = () => {
    if (submission && submission.length > 1) {
      const steps = submission.map((step) => step?.title);
      console.log("steps",steps)
      return (
       
        <Stepper steps={steps} activeStep={currentStep} />
      );
    }
    return null;
  };

  // Form Buttons
  const renderButtons = () => (
    <>
      {submission[currentStep]?.buttons?.map((btn, index) => (
      
        <Button
          key={index}
          variant="contained"
          style={{ backgroundColor:appearance?.features?.submission?.buttons?.find(bt=>btn.type==btn.type).backgroundColor?appearance?.features?.submission?.buttons?.find(bt=>bt.type==btn.type)?.backgroundColor:" ",
              color:appearance?.features?.submission?.buttons?.find(bt=>btn.type==btn.type).color||"white" 
            ,margin: '5px' }}
          onClick={() => {
            if (btn.type === "submit") {
            handleSubmitButton();
            }
            else if (btn.type === "nextStep") {
              handleNextStep(btn);
            }
            else if (btn.onClick) {

              btn.onClick(currentStep);
            }
          }}
        >
          {btn?.label}
        </Button>
      ))}
      {
        currentStep != submission.length - 1 && (
          <Button onClick={handleNextStep} style={{ margin: '5px' }}>
            Next
          </Button>
        )
      }
      {currentStep > 0 && (
        <Button onClick={handlePreviousStep} style={{ margin: '5px' }}>
          Back
        </Button>
      )}

      {
        (submission.length > 1 && presentation == "demoView") && (
          <Button style={{ margin: '5px' }}
            onClick={() => {
              if (submission[currentStep]?.title != "Configurations") {

                submission.splice(currentStep, 1);
                setRerender(prev => !prev);

              }
            }
            }
          >
            Delete Step
          </Button>
        )
      }

    </>
  );

  // Main Form Render
  const renderForm = () => {
    const currentFeature = submission[currentStep];

    // Extract fields based on whether sections are present
    const fields = currentFeature?.sections
      ? currentFeature.sections.flatMap(section => section?.parameters?.fields || [])
      : currentFeature?.parameters?.fields || [];

    return (
      <Box component="form" sx={{ p: 3 }}>
        {renderStepper()}

        {currentFeature?.sections ? (
          currentFeature.sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
                // backgroundColor: '#f9f9f9',
              }}
            >
              {section?.title && (
                <Typography variant="h6" gutterBottom>
                  {section?.title}
                </Typography>
              )}
              {renderFields(section?.parameters?.fields || [])}
            </Box>
          ))
        ) : (
          renderFields(fields)
        )}

        <Box sx={{ mt: 2 }}>{renderButtons()}</Box>
      </Box>
    );
  };

 

  const renderModal = () => (
    <Modal open={isModalOpen} onClose={toggleModal}>
      <Box
        sx={{
          width: '50%',
          margin: 'auto',
          mt: 5,
          backgroundColor: 'white',
          p: 3,
          position: 'relative',
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >

        {/* Form Content */}
        <Grid marginTop={5}>
          {renderForm()}
        </Grid>
      </Box>
    </Modal>
  );
  return (
    <>
      {(presentation?.includes('formView') || presentation?.includes('demoView')) && (
        <Box sx={{ p: 3, border: '1px solid grey', mt: 3 }}>{renderForm()}</Box>
      )}
      {presentation?.includes('modalView') && (
        <>
          {renderModal()}
        </>
      )}
     
    </>
  );
};

export default DynamicForm;
