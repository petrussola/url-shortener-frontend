import React, { useState } from 'react';
import { Link as RLink } from 'react-router-dom';
import {
	TextField,
	Grid,
	Button,
	Container,
	CssBaseline,
	Link,
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

const initialUser = {
	email: '',
	password: '',
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
	form: {
		marginTop: theme.spacing(3),
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
		margin: theme.spacing(1),
	},
}));

const Login = ({
	displayMessage,
	setDisplayMessage,
	isLoggedIn,
	setIsLoggedIn,
	history,
	setListUrlsUser,
	setLoggedUser,
	setUsersToBeApproved,
	setAllUsers,
}) => {
	const [logInUser, setLogInUser] = useState(initialUser);
	const classes = useStyles();

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
			// set message to success
			setDisplayMessage(res.data.message);
			setIsLoggedIn(true);
			setLoggedUser(res.data.data);
			setDisplayMessage('');
			// sets list of shorten urls in state for display in screen
			setListUrlsUser(data.data);
			setUsersToBeApproved(res.data.tobeapproved);
			setAllUsers(res.data.allusers);
			history.push('/');
		} catch (error) {
			// set message to failure
			setDisplayMessage(error.response.data.message);
		}
	};
	// if (isLoggedIn) {
	// 	return <Redirect to='/' />;
	// }
	return (
		<Container maxWidth='xs' className={classes.paper}>
			<CssBaseline />
			{displayMessage ? (
				<FeedbackMessage displayMessage={displayMessage} />
			) : null}
			<Avatar className={classes.avatar}>
				<LockIcon />
			</Avatar>
			<Typography variant='h5'>Log In</Typography>
			<form onSubmit={logInHandler} className={classes.form}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							type='email'
							id='email'
							label='Email'
							required
							variant='outlined'
							fullWidth
							onChange={onChangeHandler}
							value={logInUser.email}
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
							onChange={onChangeHandler}
							value={logInUser.password}
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
					Sign In
				</Button>
				<Grid container justify='center'>
					<Grid item>
						<Link variant='body2' component={RLink} to='/signup'>
							Not registered? Sign up here.
						</Link>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
};

export default Login;
