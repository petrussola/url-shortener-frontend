import React from 'react';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

const Logout = ({ history, setDisplayMessage, setIsLoggedIn, isLoggedIn }) => {
	const logOutHandler = () => {
		axiosInstance
			.get(`${baseApi}/auth/logout`)
			.then((res) => {
				setIsLoggedIn(false);
				history.push('/login');
			})
			.catch((error) => {
				setDisplayMessage(error.message);
			});
	};
	if (!isLoggedIn) {
		return null;
	}
	return <button onClick={logOutHandler}>Logout</button>;
};

export default Logout;
