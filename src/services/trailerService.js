import axios from 'axios';

export const uploadTrailer = (trailerData, onUploadProgress) => {
    return new Promise((resolve, reject) => {
        const serviceToken = localStorage.getItem('serviceToken');

        const formData = new FormData();
        formData.append('title', trailerData.title);
        formData.append('description', trailerData.description);
        formData.append('duration', trailerData.duration);
        formData.append('log_line', trailerData.log_line);
        formData.append('product_year', trailerData.product_year);
        formData.append('star1', trailerData.star1);
        formData.append('star2', trailerData.star2);
        formData.append('star3', trailerData.star3);
        formData.append('videos', trailerData.videos);
        formData.append('pictures', trailerData.pictures);

        axios
            .post(`${process.env.REACT_APP_API_URL}/upload-trailer`, formData, {
                headers: {
                    Authorization: `Bearer ${serviceToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    // Calculate the progress percentage
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    if (onUploadProgress) {
                        onUploadProgress(percentCompleted);
                    }
                }
            })
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(new Error(response.data.message || 'Failed to upload trailer'));
                }
            })
            .catch((error) => {
                console.error('API error:', error);
                reject(new Error(error.response?.data?.message || 'An error occurred while uploading trailer'));
            });
    });
};
