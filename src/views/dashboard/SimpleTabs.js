import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, IconButton, Grid } from '@mui/material';

// assets
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';

export default function FileUploader() {
    const theme = useTheme();
    const [isDragging, setIsDragging] = useState(false);

    // Drag event handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        // You can handle the file drop logic here
        const files = e.dataTransfer.files;
        console.log(files);
    };

    return (
        <Box
            sx={{
                p: 3,
                textAlign: 'center',
                border: isDragging ? '2px dashed' : '2px solid transparent',
                borderColor: isDragging ? theme.palette.primary.main : 'transparent',
                borderRadius: '8px',
                transition: 'border-color 0.3s ease',
                bgcolor: isDragging ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Typography variant="h6" gutterBottom>
                Drop files here or select a file
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                <Grid item>
                    <IconButton aria-label="download" size="large">
                        <FileDownloadTwoToneIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton aria-label="upload" size="large">
                        <CloudUploadTwoToneIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary">
                or select a file from your computer
            </Typography>
            <Link to="#" sx={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                Browse files
            </Link>
        </Box>
    );
}
