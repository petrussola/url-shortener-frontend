import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const AddUrl = ({ location, match, history, shortUrl, setShortUrl }) => {
	const [urlInput, setUrlInput] = useState('');

	const hostname = window.location.href;

	const changeUrlHandler = (e) => {
		setUrlInput(e.target.value);
	};

	const shortenUrl = (e) => {
        e.preventDefault();
        // clean input field
        setUrlInput('');
        // add https
		const newUrl = `https://${urlInput}`;
		let baseApi;
		if (process.env.NODE_ENV === 'development') {
			baseApi = 'http://localhost:5000';
		}
		axios
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				setShortUrl(res.data.url);
			})
			.catch((error) => {
				debugger;
			});
	};

	return (
		<div>
			<form onSubmit={(e) => shortenUrl(e)}>
				<label htmlFor='url-input'>https://</label>
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
