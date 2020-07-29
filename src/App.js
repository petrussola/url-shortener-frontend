import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';

import FetchUrl from './Components/FetchUrl';
import AddUrl from './Components/AddUrl';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState(false);
	const [newUrl, setNewUrl] = useState(null);
	const [shortUrl, setShortUrl] = useState(null);
	return (
		<div className='App'>
			<Switch>
				<Route path='/signup' component={SignUp} />
				<Route path='/login' component={Login} />
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
