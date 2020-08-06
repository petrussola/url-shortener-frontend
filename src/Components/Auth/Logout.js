import React from 'react';
import axios from 'axios';

const Logout = ({ history, setDisplayMessage, setIsLoggedIn }) => {
	const logOutHandler = () => {
		axios
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
