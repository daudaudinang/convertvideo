// api/productApi.js 
import axiosClient from './axiosClient';

const UserApi = {
    register: (params) => { 
        return axiosClient.post('/register', { 
            ...params
        });
    },
    getUserList: () => {
        return axiosClient.post('/getUserList', {
            
        });
    },
    getUser: (id) => {
        return axiosClient.post('/getUser', {
            id: id
        });
    },
    addUser: (params) => {
        return axiosClient.post('/addUser', {
            ...params
        });
    },
    editUser: (params) => {
        return axiosClient.post('/editUser', {
            ...params
        });
    },
    removeUser: (id) => {
        return axiosClient.post('/removeUser', {
            id:id
        });
    },
}

export default UserApi;