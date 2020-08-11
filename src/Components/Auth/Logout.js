import React from 'react';

// helpers
import axiosInstance from '../../Config/axios';

const Logout = ({ history, setDisplayMessage, setIsLoggedIn }) => {
	const logOutHandler = () => {
		axiosInstance
			.get('/auth/logout')
			.then((res) => {
				setIsLoggedIn(false);
				history.push('/login');
			})
			.catch((error) => {
				setDisplayMessage(error.message);
			});
	};
	return <button onClick={logOutHandler}>Logout</button>;
};

export default Logout;
