import React, { useState } from 'react';

const initialForm = {
	email: '',
	password: '',
	repeatPassword: '',
};

const SignUp = () => {
	const [formValue, setFormValue] = useState(initialForm);
	const [errorMessage, setErrorMessage] = useState('');

	// when user inputs data in the form
	const onChangeFormInput = (e) => {
		setFormValue({ ...formValue, [e.target.id]: e.target.value });
	};

	// when user submits form
	const onSubmitForm = (e) => {
		e.preventDefault();
		// clear error message, if any
		setErrorMessage('');
		// if passwords don't match, set error message
		if (formValue.password !== formValue.repeatPassword) {
			setErrorMessage("Passwords don't match");
		} else {
			//otherwise
			console.log(formValue);
		}
	};

	return (
		<div>
			{errorMessage ? <h5>{errorMessage}</h5> : null}
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
