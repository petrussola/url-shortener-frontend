import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const Navbar = ({
	setDisplayMessage,
	setIsLoggedIn,
	isLoggedIn,
	loggedUser,
}) => {
	if (!loggedUser.approved || !isLoggedIn) {
		return null;
	}
	debugger;
	return (
		<div>
			<Logout
				setDisplayMessage={setDisplayMessage}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
				loggedUser={loggedUser}
			/>
			{!loggedUser.admin ? null : <Link to='/admin'>Admin Panel</Link>}
		</div>
	);
};

export default Navbar;
