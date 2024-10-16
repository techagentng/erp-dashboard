import axios from 'axios';

export const uploadTrailer = (formData, onUploadProgress) => {
    const serviceToken = localStorage.getItem('serviceToken'); // Retrieve serviceToken from localStorage

    return axios
        .post(`${process.env.REACT_APP_API_URL}/upload-trailer`, formData, {
            headers: {
                Authorization: `Bearer ${serviceToken}`,
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onUploadProgress) {
                    onUploadProgress(percentCompleted);
                }
            }
        })
        .then((response) => {
            if (response.status === 201 || response.status === 200) {
                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to upload trailer');
            }
        })
        .catch((error) => {
            console.error('API error:', error);
            throw new Error(error.response?.data?.message || 'An error occurred while uploading trailer');
        });
};
