import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

const BorrowerRegistration2 = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        phoneNumber: '',
        otherPhoneNumber: '',
        nrcNumber: '',
        address: '',
        nrcAttachment: null,
        otherAttachments: [], // Assuming multiple attachments
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData({
            ...formData,
            [name]: files[0], // Assuming only one file is selected
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission, e.g., send data to server
        console.log(formData);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Borrower Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        {/* Other fields similar to the one above */}
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                            style={{ marginTop: '20px' }}
                        >
                            Upload NRC Attachment
                            <input
                                type="file"
                                name="nrcAttachment"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        {/* Other attachments */}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            style={{ marginTop: '20px' }}
                        >
                            Register
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default BorrowerRegistration2;
