require('dotenv').config();

let baseApi;

if (process.env.NODE_ENV === 'development') {
	baseApi = 'http://localhost:5000';
} else {
	baseApi = process.env.REACT_APP_BASE_API;
}

export default baseApi;
