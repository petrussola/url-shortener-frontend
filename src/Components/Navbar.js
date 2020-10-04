import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Auth/Logout';

const Navbar = ({
	history,
	setDisplayMessage,
	setIsLoggedIn,
	isLoggedIn,
	loggedUser,
	setShortUrl,
}) => {
	if (!loggedUser.approved || !isLoggedIn) {
		return null;
	}
	return (
		<div>
			<Logout
				setDisplayMessage={setDisplayMessage}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
				loggedUser={loggedUser}
				history={history}
				setShortUrl={setShortUrl}
			/>
			{!loggedUser.admin ? null : <Link to='/admin'>Admin Panel</Link>}
		</div>
	);
};

export default Navbar;
