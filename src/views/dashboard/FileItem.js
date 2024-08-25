import React from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';

const FileItem = ({ thumbnail, filename, uploadDate }) => {
    return (
        <Card sx={{ display: 'flex', mb: 2 }}>
            <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={thumbnail}
                alt={filename}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                <CardContent>
                    <Typography variant="subtitle1" component="div">
                        {filename}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Uploaded on: {uploadDate}
                    </Typography>
                </CardContent>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
                <Button variant="contained" color="success" sx={{ mr: 1 }}>
                    Approve
                </Button>
                <Button variant="contained" color="error">
                    Reject
                </Button>
            </Box>
        </Card>
    );
};

export default FileItem;
