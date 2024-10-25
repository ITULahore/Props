import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Paper, Divider } from "@mui/material";

function GeneratedObjectPage() {
    const location = useLocation();
    const { config } = location.state || {};

    const generatedObject = {
        config: [
            {
                authorization: {
                    accessToken: config.accessToken,
                },
                multistep: config.multistep,
                encryption: config.encryption,
                parameters: config.parameters,
                validation: config.validation,
                sendOTP: config.sendOTP,
                verifyOTP: config.verifyOTP,
                querying: config.querying,
                sendEmail: config.sendEmail,
                updating: config.updating,
                callback_function: config.callback_function,
            }
        ],
        data: [
            // Add your data structure here based on the config
        ],
        response: [
            // Add your response structure here based on the config
        ]
    };

    return (
        <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                    Generated Object
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1" gutterBottom>
                    Your generated configuration object based on the selected settings:
                </Typography>
                <pre style={{ background: "#eaeaea", padding: "16px", borderRadius: "4px", overflowX: "auto" }}>
                    {JSON.stringify(generatedObject, null, 2)}
                </pre>
            </Paper>
        </Box>
    );
}

export default GeneratedObjectPage;
