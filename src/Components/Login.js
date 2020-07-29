import React, { useState } from 'react';
import axios from 'axios';

import baseApi from '../Config/config';

const initialUser = {
	email: '',
	password: '',
};

const Login = () => {
	const [logInUser, setLogInUser] = useState(initialUser);

	// when user types in credentials
	const onChangeHandler = (e) => {
		setLogInUser({ ...logInUser, [e.target.id]: e.target.value });
	};

	// when user clicks on login
	const logInHandler = (e) => {
		e.preventDefault();
		console.log(logInUser);
		axios
			.post(`${baseApi}/auth/login`, logInUser)
			.then((res) => {
				debugger;
			})
			.catch((error) => {
				debugger;
			});
	};
	return (
		<div>
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
