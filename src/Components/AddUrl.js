// components
import ReturnedShortUrl from './ReturnedShortUrl';
import BackButton from './Admin/Navigation/BackButton';
import {
	Paper,
	FormControl,
	Select,
	MenuItem,
	TextField,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// helpers
import baseApi from '../Config/config';
import axiosInstance from '../Config/axios';

// dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100px',
	},
	paper: {
		padding: '2rem',
		minWidth: '50%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		marginLeft: theme.spacing(1),
	},
}));

const AddUrl = ({
	shortUrl,
	setShortUrl,
	setListUrlsUser,
	loggedUser,
	match,
}) => {
	const [urlInput, setUrlInput] = useState('');
	const [protocolInput, setProtocolInput] = useState('https://');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const classes = useStyles();

	const changeUrlHandler = (e) => {
		setUrlInput(e.target.value);
	};

	const changeProtocolHandler = (e) => {
		setProtocolInput(e.target.value);
	};

	const shortenUrl = (e) => {
		e.preventDefault();
		// set loading state to ture
		setIsLoading(true);
		// clean input field
		setUrlInput('');
		// add https or http
		const newUrl = `${protocolInput}${urlInput}`;
		// api call
		axiosInstance
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				// clean loading state
				setIsLoading(false);
				setShortUrl(res.data.url);
				// updates local state with new url linked to a user
				setListUrlsUser(res.data.urlsUser);
			})
			.catch((error) => {
				// clean loading state
				setIsLoading(false);
				setError(error.message);
			});
	};

	if (Object.keys(loggedUser).length === 0) {
		return <Redirect to='/login' />;
	}

	if (Object.keys(loggedUser).length !== 0 && !loggedUser.approved) {
		return (
			<section>
				<div>Your request is pending approval</div>
				<BackButton match={match} destination='login' />
			</section>
		);
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation='1'>
				{/* if there is an error it displays the message on top */}
				{error ? <h5 id='error-message'>{error}</h5> : null}
				{isLoading ? <h5>Loading...</h5> : null}
				<form onSubmit={(e) => shortenUrl(e)} className={classes.form}>
					<FormControl>
						<Select
							onChange={(e) => changeProtocolHandler(e)}
							value={protocolInput}
							variant='outlined'
						>
							<MenuItem value={'http://'}>http://</MenuItem>
							<MenuItem value={'https://'}>https://</MenuItem>
						</Select>
					</FormControl>
					<TextField
						type='text'
						id='url-input'
						value={urlInput}
						onChange={(e) => changeUrlHandler(e)}
						placeholder='Add your URL'
						variant='outlined'
					/>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						className={classes.button}
						size='medium'
					>
						Shorten URL
					</Button>
				</form>
				{/* it displays the return short url returned by the server */}
				<ReturnedShortUrl shortUrl={shortUrl} />
			</Paper>
			{/* display list of urls by the same user */}
		</div>
	);
};

export default AddUrl;
