import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import FetchUrl from './Components/FetchUrl';

function App() {
	return (
		<div className='App'>
			<Route path='/:shortUrl' component={FetchUrl} />
		</div>
	);
}

export default App;
