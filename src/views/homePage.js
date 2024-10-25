import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Typography, Paper } from '@mui/material';

// Define sections directly inside HomePage component
const HomePage = () => {
    const sections = [
        {
            title: 'Frontend Frameworks',
            description: 'Explore documentation for various frontend technologies like React, Angular, Vue, etc.',
            route: '/frontend',
            buttonLabel: 'View Frontend Docs',
            background: 'linear-gradient(90deg, #43C6AC 0%, #191654 100%)',
        },
        {
            title: 'Backend Frameworks',
            description: 'Learn about backend frameworks like Node.js, Django, Flask, etc.',
            route: '/backend',
            buttonLabel: 'View Backend Docs',
            background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
        },
    ];

    return (
        < Grid item xs={12} sm={6} md={4} >
            <Container>
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
                    Welcome to the Documentation Portal
                </Typography>


                <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 4 }}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                <Typography variant="h5" gutterBottom>
                                    {section.title}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {section.description}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={section.route}
                                    variant="contained"
                                    sx={{
                                        background: section.background,
                                        color: 'white',
                                        padding: '10px 20px',

                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.transform = 'scale(1.05)';
                                        e.target.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.25)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.transform = 'scale(1)';
                                        e.target.style.boxShadow = '0px 6px 16px rgba(0, 0, 0, 0.15)';
                                    }}
                                >
                                    {section.buttonLabel}
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Grid>
    );
};

export default HomePage;
