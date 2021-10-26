// api/productApi.js 
import axiosClient from './axiosClient';

const FileApi = {
    getListFile: () => {
        return axiosClient.post('/getListFile', { 
            
        });
    },
    uploadFile: (formData) => {
        return axiosClient.post('/uploadFile', formData, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    removeFile: (id) => {
        return axiosClient.post('/removeFile', { 
            id: id
        });
    },

}

export default FileApi;