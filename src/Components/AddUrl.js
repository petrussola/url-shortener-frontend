import baseApi from '../Config/config';

import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const AddUrl = ({ location, match, history, shortUrl, setShortUrl }) => {
	const [urlInput, setUrlInput] = useState('');
	const [protocolInput, setProtocolInput] = useState('https://');
	const [error, setError] = useState(null);

	const hostname = window.location.href;

	const changeUrlHandler = (e) => {
		setUrlInput(e.target.value);
	};

	const changeProtocolHandler = (e) => {
		setProtocolInput(e.target.value);
	};

	const shortenUrl = (e) => {
		e.preventDefault();
		// clean input field
		setUrlInput('');
		// add https or http
		const newUrl = `${protocolInput}${urlInput}`;
		// api call
		axios
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				setShortUrl(res.data.url);
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<div>
			{error ? <h5 id='error-message'>{error}</h5> : null}
			<form onSubmit={(e) => shortenUrl(e)}>
				<select
					onChange={(e) => changeProtocolHandler(e)}
					value={protocolInput}
				>
					<option value='http://'>http://</option>
					<option value='https://'>https://</option>
				</select>
				<input
					type='text'
					id='url-input'
					value={urlInput}
					placeholder='Add your URL'
					onChange={(e) => changeUrlHandler(e)}
				/>
				<button type='submit'>Shorten URL</button>
			</form>
			<h2>{shortUrl ? `${hostname}${shortUrl}` : null}</h2>
		</div>
	);
};

export default AddUrl;
