import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';

const ComponentSelection = ({ buttonsData }) => {
  return (
    <Container 
      style={{
        marginTop: '80px', 
        textAlign: 'center', 
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', 
        padding: '40px',
        borderRadius: '15px'
      }}
    >
      {/* Dynamic Header */}
      <Typography 
        variant="h4" 
        gutterBottom
        style={{
          background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
          color: '#fff',
          padding: '15px 20px',
          borderRadius: '10px',
          marginBottom: '40px'
        }}
      >
        Select a Component to View Props
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Mapping over the buttonsData prop */}
        {buttonsData.map((button, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Button
              fullWidth
              style={{
                background: button.background, // Gradient from props
                color: '#fff',
                padding: '20px',
                borderRadius: '20px',
                fontSize: '18px',
                boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onClick={button.onClick} // Function from props
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.25)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.15)';
              }}
            >
              {button.label} {/* Label from props */}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ComponentSelection;
