import React, { useState } from 'react';
import styled from 'styled-components';

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

const StyledDiv = styled.div`
	border: 1px solid #cccccc;
	width: 50vw;
	min-height: 50vh;
	margin: 100px auto;
	border-radius: 4px;
	box-shadow: 2px 4px 5px #cccccc;
	color: #7c7c7c;
	form {
		display: flex;
		flex-direction: column;
		width: 80%;
		margin: 0 auto;
		section {
			margin: 0.5rem 0;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			label {
				font-size: 90%;
			}
			input {
				width: 100%;
				height: 2rem;
				padding: 0.5rem 1rem;
				font-size: 1.5rem;
			}
			button {
				width: 50%;
				margin: 0 auto;
				border: none;
				height: 3rem;
				background-color: #187bcd;
				border-radius: 4px;
				font-size: 1rem;
				color: white;
			}
		}
	}
`;

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
		<StyledDiv>
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<form onSubmit={onSubmitForm}>
				<section>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						value={formValue.email}
						placeholder='Email'
						onChange={onChangeFormInput}
					/>
				</section>
				<section>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={formValue.password}
						placeholder='Password'
						onChange={onChangeFormInput}
					/>
				</section>
				<section>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={formValue.password}
						placeholder='Password'
						onChange={onChangeFormInput}
					/>
				</section>
				<section>
					<label htmlFor='repeatPassword'>Confirm Password</label>
					<input
						type='password'
						id='repeatPassword'
						value={formValue.repeatPassword}
						placeholder='Confirm your password'
						onChange={onChangeFormInput}
					/>
				</section>
				<section>
					<button type='submit'>Submit</button>
				</section>
			</form>
		</StyledDiv>
	);
};

export default SignUp;
