// api/productApi.js 
import axiosClient from './axiosClient';

const AuthApi = {
    login: (params) => { 
        return axiosClient.post('/login', {
            ...params
        });
    },
}

export default AuthApi;