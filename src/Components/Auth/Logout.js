import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

const StyledButton = styled.button`
	border: none;
	height: 2rem;
	background-color: #187bcd;
	font-size: 1rem;
	color: white;
	@media (max-width: 600px) {
		margin: 0.2rem;
	}
`;

const useStyles = makeStyles((theme) => ({
	button: {
		color: 'white',
		borderColor: 'white',
	},
}));

const Logout = ({ history, setDisplayMessage, logOutAllState }) => {
	const classes = useStyles();

	const logOutHandler = () => {
		axiosInstance
			.get(`${baseApi}/auth/logout`)
			.then((res) => {
				logOutAllState();
				history.push('/login');
			})
			.catch((error) => {
				setDisplayMessage(error.message);
			});
	};
	return (
		<Button
			onClick={logOutHandler}
			variant='outlined'
			className={classes.button}
		>
			Logout
		</Button>
	);
};

export default Logout;
