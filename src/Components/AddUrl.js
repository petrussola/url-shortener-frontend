import React, { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const AddUrl = () => {
	const [urlInput, setUrlInput] = useState('');

	const changeUrlHandler = (e) => {
		setUrlInput(e.target.value);
	};

	const shortenUrl = (e) => {
		e.preventDefault();
		const newUrl = `https://${urlInput}`;
		let baseApi;
		if (process.env.NODE_ENV === 'development') {
			baseApi = 'http://localhost:5000';
		}
		axios
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				debugger;
			})
			.catch((error) => {
				debugger;
			});
	};

	return (
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
	);
};

export default AddUrl;
