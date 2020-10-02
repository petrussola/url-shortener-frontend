import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

// components

import FetchUrl from './Components/FetchUrl';
import AddUrl from './Components/AddUrl';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';
import ListUrlsUser from './Components/ListUrlsUser';
import AdminPanel from './Components/Admin/AdminPanel';
import NavBar from './Components/Navbar';

// helpers
import baseApi from './Config/config';
import axiosInstance from './Config/axios';
import Navbar from './Components/Navbar';

function App() {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [newUrl, setNewUrl] = useState(null);
	const [shortUrl, setShortUrl] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedUser, setLoggedUser] = useState({});
	const [listUrlsUser, setListUrlsUser] = useState([]);
	const [usersToBeApproved, setUsersToBeApproved] = useState([]);

	// auth related state
	const [displayMessage, setDisplayMessage] = useState('');

	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axiosInstance.get(`${baseApi}/auth/csrf-token`);
			axiosInstance.defaults.headers.post['x-csrf-token'] = data.csrfToken;
		};
		getCsrfToken();
	}, []);

	return (
		<div className='App'>
			<Route
				path='/'
				render={(props) => (
					<Navbar
						{...props}
						setDisplayMessage={setDisplayMessage}
						setIsLoggedIn={setIsLoggedIn}
						isLoggedIn={isLoggedIn}
						loggedUser={loggedUser}
					/>
				)}
			/>
			<Switch>
				<Route
					path='/signup'
					render={(props) => (
						<SignUp
							{...props}
							displayMessage={displayMessage}
							setDisplayMessage={setDisplayMessage}
						/>
					)}
				/>
				<Route
					path='/login'
					render={(props) => (
						<Login
							{...props}
							displayMessage={displayMessage}
							setDisplayMessage={setDisplayMessage}
							isLoggedIn={isLoggedIn}
							setIsLoggedIn={setIsLoggedIn}
							setListUrlsUser={setListUrlsUser}
							setLoggedUser={setLoggedUser}
							setUsersToBeApproved={setUsersToBeApproved}
						/>
					)}
				/>
				<Route
					path='/:shortUrl'
					render={(props) => (
						<FetchUrl
							{...props}
							redirect={redirect}
							setRedirect={setRedirect}
							error={error}
							setError={setError}
							newUrl={newUrl}
							setNewUrl={setNewUrl}
						/>
					)}
				/>
			</Switch>
			<PrivateRoute
				exact
				path='/'
				render={(props) => (
					<AdminPanel
						{...props}
						loggedUser={loggedUser}
						usersToBeApproved={usersToBeApproved}
						setUsersToBeApproved={setUsersToBeApproved}
					/>
				)}
			/>
			<PrivateRoute
				exact
				path='/'
				render={(props) => (
					<AddUrl
						{...props}
						shortUrl={shortUrl}
						setShortUrl={setShortUrl}
						setListUrlsUser={setListUrlsUser}
						listUrlsUser={listUrlsUser}
						loggedUser={loggedUser}
					/>
				)}
			/>
			<PrivateRoute
				exact
				path='/'
				render={(props) => (
					<ListUrlsUser
						{...props}
						listUrlsUser={listUrlsUser}
						loggedUser={loggedUser}
					/>
				)}
			/>
		</div>
	);
}

const PrivateRoute = ({ render: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			Cookie.get('isLoggedIn') === 'true' ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: '/login',
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

export default App;
