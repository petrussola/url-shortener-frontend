import React, { useState } from 'react';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

// components
import FeedbackMessage from './FeedbackMessage';

const initialForm = {
	email: '',
	password: '',
	repeatPassword: '',
};

const SignUp = ({ displayMessage, setDisplayMessage }) => {
	const [formValue, setFormValue] = useState(initialForm);
	// const [displayMessage, setDisplayMessage] = useState('');

	// when user inputs data in the form
	const onChangeFormInput = (e) => {
		setFormValue({ ...formValue, [e.target.id]: e.target.value });
	};

	// when user submits form
	const onSubmitForm = (e) => {
		e.preventDefault();
		// clear error message, if any
		setDisplayMessage('');
		// if passwords don't match, set error message
		if (formValue.password !== formValue.repeatPassword) {
			setDisplayMessage("Passwords don't match");
		} else {
			//otherwise
			axiosInstance
				.post(`${baseApi}/auth/signup`, {
					email: formValue.email,
					password: formValue.password,
				})
				.then((res) => {
					// set succesful message
					setDisplayMessage(res.data.message);
				})
				.catch((error) => {
					// set error message
					setDisplayMessage(error.response.data.message);
				});
		}
	};

	return (
		<div>
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<form onSubmit={onSubmitForm}>
				<label htmlFor='email'>Email</label>
				<input
					type='email'
					id='email'
					value={formValue.email}
					placeholder='Email'
					onChange={onChangeFormInput}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					value={formValue.password}
					placeholder='Password'
					onChange={onChangeFormInput}
				/>
				<label htmlFor='repeatPassword'>Confirm Password</label>
				<input
					type='password'
					id='repeatPassword'
					value={formValue.repeatPassword}
					placeholder='Confirm your password'
					onChange={onChangeFormInput}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default SignUp;
