import React from 'react';
import Logout from './Auth/Logout';

const Navbar = ({
	setDisplayMessage,
	setIsLoggedIn,
	isLoggedIn,
	loggedUser,
}) => {
	return (
		<div>
			<Logout
				setDisplayMessage={setDisplayMessage}
				setIsLoggedIn={setIsLoggedIn}
				isLoggedIn={isLoggedIn}
				loggedUser={loggedUser}
			/>
			<p>hello</p>
		</div>
	);
};

export default Navbar;
