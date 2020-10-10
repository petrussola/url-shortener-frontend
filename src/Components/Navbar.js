import React from 'react';
import { Link as RLink } from 'react-router-dom';
import Logout from './Auth/Logout';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Badge,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	button: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	icon: {
		color: 'white',
	},
}));

const Navbar = ({
	history,
	setDisplayMessage,
	isLoggedIn,
	loggedUser,
	logOutAllState,
	usersToBeApproved,
}) => {
	const classes = useStyles();

	if (!loggedUser.approved || !isLoggedIn) {
		return null;
	}
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						className={classes.title}
						color='secondary'
						align='left'
					>
						Url Shortener
					</Typography>
					{!loggedUser.admin ? null : (
						// <RLink to='/admin'>{`Admin Panel (${usersToBeApproved.length})`}</RLink>
						<IconButton className={classes.icon} component={RLink} to='/admin'>
							<Badge badgeContent={usersToBeApproved.length} color='secondary'>
								<SupervisorAccountIcon fontSize='large' />
							</Badge>
						</IconButton>
					)}
					<Button>
						<Logout
							setDisplayMessage={setDisplayMessage}
							history={history}
							logOutAllState={logOutAllState}
						/>
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
