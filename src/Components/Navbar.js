import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const Navbar = ({
	history,
	setDisplayMessage,
	isLoggedIn,
	loggedUser,
	logOutAllState,
}) => {
	if (!loggedUser.approved || !isLoggedIn) {
		return null;
	}
	return (
		<div>
			<Logout
				setDisplayMessage={setDisplayMessage}
				history={history}
				logOutAllState={logOutAllState}
			/>
			{!loggedUser.admin ? null : <Link to='/admin'>Admin Panel</Link>}
		</div>
	);
};

export default Navbar;
