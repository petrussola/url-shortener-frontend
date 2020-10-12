import React, { useRef } from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

// helpers
import copyToClipboard from '../Helpers/helpers';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	details: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}));

const UrlItem = ({ url }) => {
	const textAreaRef = useRef(null);

	const classes = useStyles();
	// set hostname to show user
	const hostname = window.location.href;
	return (
		<Accordion className={classes.root}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>{url.longUrl}</Typography>
			</AccordionSummary>
			<AccordionDetails className={classes.details}>
				<Typography id='shortened' ref={textAreaRef}>
					{`${hostname}${url.shortUrl}`}
				</Typography>
				<Button
					onClick={() => copyToClipboard(textAreaRef)}
					id='copy-button'
					color='primary'
					variant='outlined'
				>
					Copy to Clipboard
				</Button>
				{/* <h3 id='shortened' ref={textAreaRef}>{`${hostname}${url.shortUrl}`}</h3>
			<h3 onClick={() => copyToClipboard(textAreaRef)} id='copy-button'>
			Copy to Clipboard
		</h3> */}
			</AccordionDetails>
		</Accordion>
	);
};

export default UrlItem;
