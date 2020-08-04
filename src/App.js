import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import FetchUrl from './Components/FetchUrl';
import AddUrl from './Components/AddUrl';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import Logout from './Components/Auth/Logout';

function App() {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [newUrl, setNewUrl] = useState(null);
	const [shortUrl, setShortUrl] = useState(null);

	// auth related state
	const [displayMessage, setDisplayMessage] = useState('');

	return (
		<div className='App'>
			<Route
				path='/'
				render={(props) => (
					<Logout {...props} setDisplayMessage={setDisplayMessage} />
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
				<Route
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

export default App;
