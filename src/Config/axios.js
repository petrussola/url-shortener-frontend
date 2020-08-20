import axios from 'axios';

let axiosInstance = axios.create({
	withCredentials: true,
});

export default axiosInstance;
