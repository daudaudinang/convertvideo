// api/axiosClient.js import axios from 'axios';
import queryString from 'query-string';
import axios from 'axios';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs

const axiosClient = axios.create({ 
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {'content-type': 'application/json',}
,
paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(config => {

    if(localStorage.getItem('access_token')) {
        config.headers = {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        }
    }
    // Handle token here ... 
    return config;
});

axiosClient.interceptors.response.use((response) => { 
    if (response && response.data) {
        if(response.data.status === -1) {
            localStorage.clear();
            return;
        }
        return response.data;
    }

    return response;
}, (error) => {
    throw error;
});

export default axiosClient;