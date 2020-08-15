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

// helpers
import baseApi from './Config/config';
import axiosInstance from './Config/axios';

function App() {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [newUrl, setNewUrl] = useState(null);
	const [shortUrl, setShortUrl] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// auth related state
	const [displayMessage, setDisplayMessage] = useState('');

	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axiosInstance.get(`${baseApi}/auth/csrf-token`);
			debugger;
			axiosInstance.defaults.headers.post['x-csrf-token'] = data.csrfToken;
		};
		getCsrfToken();
	}, []);

	return (
		<div className='App'>
			<div>{`${process.env.REACT_APP_BASE_API} << env variable`}</div>
			<Route
				path='/'
				render={(props) => (
					<Logout
						{...props}
						setDisplayMessage={setDisplayMessage}
						setIsLoggedIn={setIsLoggedIn}
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
				<PrivateRoute
					exact
					path='/'
					render={(props) => (
						<AddUrl {...props} shortUrl={shortUrl} setShortUrl={setShortUrl} />
					)}
				/>
			</Switch>
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
