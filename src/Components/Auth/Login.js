import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
}) => {
	const [logInUser, setLogInUser] = useState(initialUser);

	// when user types in credentials
	const onChangeHandler = (e) => {
		setLogInUser({ ...logInUser, [e.target.id]: e.target.value });
	};

	// when user clicks on login
	const logInHandler = (e) => {
		e.preventDefault();
		setDisplayMessage('');
		axios
			.post(`/auth/login`, logInUser)
			.then((res) => {
				// set message to success
				setDisplayMessage(res.data.message);
				// // save token to local storage
				// const token = res.data.data.token;
				// localStorage.setItem('token', token);
				// redirect to home page
				// history.push('/');
				setIsLoggedIn(true);
				setDisplayMessage('');
			})
			.catch((error) => {
				// set message to failure
				setDisplayMessage(error.response.data.message);
			});
	};
	if (isLoggedIn) {
		return <Redirect to='/' />;
	}
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
