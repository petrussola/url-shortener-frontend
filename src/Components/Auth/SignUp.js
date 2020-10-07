import React, { useState } from 'react';
import styled from 'styled-components';
import { Link as Rlink } from 'react-router-dom';
import { TextField, Grid, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
	min-height: 30vh;
	margin: 100px auto;
	border-radius: 4px;
	box-shadow: 2px 4px 5px #cccccc;
	color: #7c7c7c;
	@media (max-width: 600px) {
		width: 90%;
	}
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
				@media (max-width: 600px) {
					height: 3rem;
				}
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

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const SignUp = ({ displayMessage, setDisplayMessage }) => {
	const [formValue, setFormValue] = useState(initialForm);
	const classes = useStyles();

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
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type='email'
							id='email'
							label='Email'
							required
							autoComplete
							variant='outlined'
							fullWidth
							onChange={onChangeFormInput}
							value={formValue.email}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type='password'
							id='password'
							label='Password'
							required
							variant='outlined'
							fullWidth
							onChange={onChangeFormInput}
							value={formValue.password}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							type='password'
							id='repeatPassword'
							label='Confirm Password'
							required
							variant='outlined'
							fullWidth
							onChange={onChangeFormInput}
							value={formValue.repeatPassword}
						/>
					</Grid>
				</Grid>
				<Button
					type='submit'
					color='primary'
					variant='contained'
					className={classes.submit}
				>
					Sign Up
				</Button>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Link
							underline='hover'
							color='secondary'
							component={Rlink}
							to='/login'
						>
							Already registered? Log in here.
						</Link>
					</Grid>
				</Grid>
			</form>
		</StyledDiv>
	);
};

export default SignUp;
