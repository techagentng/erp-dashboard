import React, { useState, useRef } from 'react';
import { Box, Button, Modal, Typography, TextField, IconButton, Badge } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import CloseIcon from '@mui/icons-material/Close';

export default function FileUploader() {
    const theme = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null); // State for single file
    const [multipleFiles, setMultipleFiles] = useState([]); // State for multiple image files
    const [openModal, setOpenModal] = useState(false); // State to control modal visibility
    const [modalFile, setModalFile] = useState(null);
    const [formData, setFormData] = useState({
        logLine: '',
        productionYear: '',
        star1: '',
        star2: '',
        star3: ''
    });

    const fileInputRef = useRef(null);
    const modalFileInputRef = useRef(null);
    // Drag and drop handlers
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
        setFile(droppedFiles[0]); // Assuming we treat the first file as the main one
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

    const handleSubmit = () => {
        console.log('Submitted Data:', {
            file,
            multipleFiles,
            ...formData
        });
        setModalFile(null); // Reset modal file after submission
        handleCloseModal();
    };
    // Handle modal open and close
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Handle form data change
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle file input change (for single or multiple files)
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setMultipleFiles(selectedFiles);
        setFile(selectedFiles[0]);
        setOpenModal(true);
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // const handleUploadPoster = () => {
    //     if (fileInputRef.current) {
    //         fileInputRef.current.click();
    //     }
    // };

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
            {/* Hidden file input */}
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

            {/* Modal with form */}
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
                    {/* Badge for file count */}
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

                    <Typography id="file-modal-title" variant="h6" component="h2">
                        File Upload Form
                    </Typography>
                    <Typography id="file-modal-description" sx={{ mt: 2 }}>
                        Please fill in the details and submit.
                    </Typography>

                    <Box component="form" sx={{ mt: 2 }}>
                        {/* Picture Upload Preview */}
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
                                    <Typography variant="h6" gutterBottom>
                                        Drop an image file here or click to select a file
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
                        {/* Form Fields */}
                        <TextField
                            fullWidth
                            label="Log Line"
                            name="logLine"
                            value={formData.logLine}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Production Year"
                            name="productionYear"
                            value={formData.productionYear}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Star 1"
                            name="star1"
                            value={formData.star1}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Star 2"
                            name="star2"
                            value={formData.star2}
                            onChange={handleInputChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Star 3"
                            name="star3"
                            value={formData.star3}
                            onChange={handleInputChange}
                            margin="normal"
                        />

                        {/* Submit Button */}
                        <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, float: 'right' }}>
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}
