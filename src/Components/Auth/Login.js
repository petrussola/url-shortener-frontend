import React, { useState } from 'react';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

// components
import FeedbackMessage from './FeedbackMessage';

const initialUser = {
	email: '',
	password: '',
};

const Login = ({
	displayMessage,
	setDisplayMessage,
	isLoggedIn,
	setIsLoggedIn,
	history,
}) => {
	const [logInUser, setLogInUser] = useState(initialUser);

	// when user types in credentials
	const onChangeHandler = (e) => {
		setLogInUser({ ...logInUser, [e.target.id]: e.target.value });
	};

	// when user clicks on login
	const logInHandler = async (e) => {
		try {
			e.preventDefault();
			setDisplayMessage('');
			const res = await axiosInstance.post(`${baseApi}/auth/login`, logInUser);
			// set message to success
			setDisplayMessage(res.data.message);
			setIsLoggedIn(true);
			setDisplayMessage('');
			history.push('/');
		} catch (error) {
			debugger;
			// set message to failure
			setDisplayMessage(error.response.data.message);
		}
	};
	// if (isLoggedIn) {
	// 	return <Redirect to='/' />;
	// }
	return (
		<div>
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<form onSubmit={logInHandler}>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					placeholder='Email'
					value={logInUser.email}
					onChange={onChangeHandler}
				/>
				<label htmlFor='email'>Password</label>
				<input
					type='password'
					id='password'
					placeholder='Password'
					value={logInUser.password}
					onChange={onChangeHandler}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
