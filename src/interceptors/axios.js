import { endpoints } from '../repositories/endpoints';
import axios from 'axios';

axios.interceptors.response.use(resp => resp, async error => {
    const originalConfig = error?.config;
    if (error.response.status === 401 && !originalConfig?.sent) {
        originalConfig.sent = true;
        const response = await axios.post(
            endpoints.refresh,
            {},
            { withCredentials: true }
        );

        if (response.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
            return axios(error.config) // error.config => contains all the information of the last response
        }
    }

    return error;
})
