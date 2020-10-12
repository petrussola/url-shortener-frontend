import React, { useRef } from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// helpers
import copyToClipboard from '../Helpers/helpers';

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
