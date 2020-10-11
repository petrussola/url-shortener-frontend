import React, { useRef } from 'react';
import styled from 'styled-components';
import { Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// helpers
import copyToClipboard from '../Helpers/helpers';

const StyledDiv = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	width: 80%;
	margin: 0 0 1rem 0;
	@media (max-width: 600px) {
		width: 90%;
		flex-direction: column;
	}
	h4 {
		color: #187bcd;
		@media (max-width: 600px) {
			width: 100%;
		}
	}
	button {
		flex-grow: 1;
		border: none;
		height: 2rem;
		background-color: white;
		font-size: 1rem;
		color: #187bcd;
		border: 1px solid #187bcd;
		max-width: 30%;
		@media (max-width: 600px) {
			margin: 0.2rem;
			max-width: 100%;
		}
	}
`;

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(2),
	},
	button: {
		marginLeft: theme.spacing(1),
	},
}));

const ReturnedShortUrl = ({ shortUrl }) => {
	const textAreaRef = useRef(null);
	// set hostname to show user
	const hostname = window.location.href;

	const classes = useStyles();
	// if no returned url from server components doesn't display
	if (!shortUrl) {
		return null;
	}
	return (
		<Box
			display='flex'
			flexDirection='row'
			flexWrap='wrap'
			justifyContent='center'
			alignItems='centergit '
			className={classes.root}
		>
			<Typography
				ref={textAreaRef}
				variant='h6'
			>{`${hostname}${shortUrl}`}</Typography>
			<Button
				onClick={() => copyToClipboard(textAreaRef)}
				variant='outlined'
				size='small'
				className={classes.button}
				color='secondary'
			>
				Copy to clipboard
			</Button>
		</Box>
	);
};

export default ReturnedShortUrl;
