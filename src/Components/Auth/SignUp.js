import React, { useState } from 'react';
import { Link as Rlink } from 'react-router-dom';
import {
	TextField,
	Grid,
	Button,
	Link,
	Container,
	CssBaseline,
	Avatar,
	Typography,
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
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

const useStyles = makeStyles((theme) => ({
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		margin: theme.spacing(1),
	},
	form: {
		marginTop: theme.spacing(3),
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
		<Container maxWidth='xs' className={classes.paper}>
			<CssBaseline />
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<Avatar className={classes.avatar}>
				<LockIcon />
			</Avatar>
			<Typography variant='h5'>Sign Up</Typography>
			<form onSubmit={onSubmitForm} className={classes.form}>
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
					fullWidth
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
		</Container>
	);
};

export default SignUp;
