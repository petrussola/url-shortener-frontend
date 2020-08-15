import axios from 'axios';

let axiosInstance = null;

if (process.env.NODE_ENV === 'development') {
	axiosInstance = axios.create({
		withCredentials: true,
	});
} else {
	axiosInstance = axios.create();
}

export default axiosInstance;
