import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Typography, TextField, IconButton, Badge, Grid, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function FileUploader() {
    const theme = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalFile, setModalFile] = useState(null);
    const [showProgress, setShowProgress] = useState(false);
    const [progressValue, setProgressValue] = useState(0); // Initial progress value
    const fileInputRef = useRef(null);
    const modalFileInputRef = useRef(null);

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
        const droppedFiles = Array.from(e.dataTransfer.files);
        setMultipleFiles(droppedFiles);
        setFile(droppedFiles[0]);
        setOpenModal(true);
    };

    const handleModalUploadClick = () => {
        if (modalFileInputRef.current) {
            modalFileInputRef.current.click();
        }
    };

    const handleModalFileChange = (e) => {
        const selectedModalFile = e.target.files[0];
        setModalFile(selectedModalFile);
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setMultipleFiles(selectedFiles);
        setFile(selectedFiles[0]);
        setOpenModal(true);
    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const formik = useFormik({
        initialValues: {
            logLine: '',
            productionYear: '',
            star1: '',
            star2: '',
            star3: ''
        },
        validationSchema: Yup.object({
            logLine: Yup.string().required('Log Line is required'),
            productionYear: Yup.string().required('Production Year is required'),
            star1: Yup.string().required('Star 1 is required'),
            star2: Yup.string(),
            star3: Yup.string()
        }),
        onSubmit: async (values) => {
            setShowProgress(true); // Show progress bar on form submission
            setProgressValue(45);  // Set progress value (placeholder)
            
            console.log('Submitted Data:', {
                file,
                multipleFiles,
                ...values
            });
            setModalFile(null);
            handleCloseModal();

            // Simulate a delay before hiding the progress bar
            setTimeout(() => {
                setShowProgress(false);
                setProgressValue(0); // Reset progress value
            }, 183000);
        }
    });

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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
                bgcolor: isDragging ? 'rgba(0, 0, 0, 0.04)' : 'transparent'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} multiple />

            {!file ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Drop image files here or click to select files
                    </Typography>
                    <IconButton aria-label="upload" size="large" onClick={handleUploadClick}>
                        <CloudUploadTwoToneIcon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                </>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" onClick={handleOpenModal} sx={{ marginRight: 1 }}>
                        {file?.name || 'No file selected'}
                    </Button>
                    <IconButton onClick={() => setFile(null)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}

            <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="file-modal-title" aria-describedby="file-modal-description">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    {multipleFiles.length > 0 && (
                        <Badge
                            badgeContent={multipleFiles.length}
                            color="primary"
                            sx={{
                                position: 'absolute',
                                top: 100,
                                right: 78,
                                zIndex: 1
                            }}
                        />
                    )}
                    <Typography id="file-modal-description" sx={{ mt: 2 }}>
                        Please fill in the details and submit.
                    </Typography>

                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                mb: 2,
                                p: 2,
                                border: '1px dashed red',
                                borderRadius: '4px',
                                textAlign: 'left',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: '100%',
                                maxWidth: '400px'
                            }}
                        >
                            {multipleFiles.length ? (
                                <Typography noWrap>{multipleFiles.map((file) => file.name).join(', ')}</Typography>
                            ) : (
                                <Typography>No image files uploaded</Typography>
                            )}
                        </Box>
                        <Box
                            sx={{
                                mb: 2,
                                p: 2,
                                border: '1px dashed black',
                                borderRadius: '4px',
                                textAlign: 'center'
                            }}
                        >
                            {!modalFile ? (
                                <>
                                    <Typography variant="h4" gutterBottom>
                                        Drop poster
                                    </Typography>
                                    <IconButton aria-label="upload" size="large" onClick={handleModalUploadClick}>
                                        <CloudUploadTwoToneIcon sx={{ fontSize: '2rem' }} />
                                    </IconButton>
                                    <input
                                        type="file"
                                        ref={modalFileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleModalFileChange}
                                    />
                                </>
                            ) : (
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography>{modalFile.name}</Typography>
                                    <IconButton onClick={() => setModalFile(null)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Log Line"
                                    name="logLine"
                                    value={formik.values.logLine}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    margin="normal"
                                    error={formik.touched.logLine && Boolean(formik.errors.logLine)}
                                    helperText={formik.touched.logLine && formik.errors.logLine}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Production Year"
                                    name="productionYear"
                                    value={formik.values.productionYear}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    margin="normal"
                                    error={formik.touched.productionYear && Boolean(formik.errors.productionYear)}
                                    helperText={formik.touched.productionYear && formik.errors.productionYear}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            label="Star 1"
                            name="star1"
                            value={formik.values.star1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="normal"
                            error={formik.touched.star1 && Boolean(formik.errors.star1)}
                            helperText={formik.touched.star1 && formik.errors.star1}
                        />
                        <TextField
                            fullWidth
                            label="Star 2"
                            name="star2"
                            value={formik.values.star2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Star 3"
                            name="star3"
                            value={formik.values.star3}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>

            {/* Progress bar section */}
            {showProgress && (
                <Box sx={{ width: '100%', mt: 2 }}>
                    <LinearProgress variant="determinate" value={progressValue} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {progressValue}% Uploaded
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
