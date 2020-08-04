import React from 'react';
import axios from 'axios';

const Logout = ({ history, setDisplayMessage }) => {
	const logOutHandler = () => {
		console.log(document.cookie);
		axios
			.get('/auth/logout')
			.then((res) => {
				history.push('/login');
			})
			.catch((error) => {
				setDisplayMessage(error.message);
			});
	};
	return <button onClick={logOutHandler}>Logout</button>;
};

export default Logout;
