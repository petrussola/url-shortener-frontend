import React, { useState } from 'react';
import styled from 'styled-components';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

// components
import FeedbackMessage from './FeedbackMessage';

const initialUser = {
	email: '',
	password: '',
};

const StyledDiv = styled.div`
	border: 1px solid #CCCCCC;
	width: 50vw;
	max-height: 50vh;
	margin: 100px auto;
	border-radius: 4px;
	box-shadow: 2px 4px 5px #CCCCCC;
	color: #7C7C7C;
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
				background-color: #187BCD;
				border-radius: 4px;
				font-size: 1rem;
				color: white;
			}
		}
	}
`;

const Login = ({
	displayMessage,
	setDisplayMessage,
	isLoggedIn,
	setIsLoggedIn,
	history,
	setListUrlsUser,
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
			const { data } = await axiosInstance.get(`${baseApi}/list-urls`);
			debugger;
			// set message to success
			setDisplayMessage(res.data.message);
			setIsLoggedIn(true);
			setDisplayMessage('');
			// sets list of shorten urls in state for display in screen
			setListUrlsUser(data.data);
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
		<StyledDiv>
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<form onSubmit={logInHandler}>
				<section>
					<label htmlFor='email'>Email</label>
					<input
						type='text'
						id='email'
						placeholder='Email'
						value={logInUser.email}
						onChange={onChangeHandler}
					/>
				</section>
				<section>
					<label htmlFor='email'>Password</label>
					<input
						type='password'
						id='password'
						placeholder='Password'
						value={logInUser.password}
						onChange={onChangeHandler}
					/>
				</section>
				<section>
					<button type='submit'>Login</button>
				</section>
			</form>
		</StyledDiv>
	);
};

export default Login;
