// components
import ReturnedShortUrl from './ReturnedShortUrl';
// helpers
import baseApi from '../Config/config';
// dependencies
import React, { useState, useRef } from 'react';
import axios from 'axios';
require('dotenv').config();

const AddUrl = ({ location, match, history, shortUrl, setShortUrl }) => {
	const [urlInput, setUrlInput] = useState('');
	const [protocolInput, setProtocolInput] = useState('https://');
	const [error, setError] = useState(null);
	const textAreaRef = useRef(null);

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
		console.log(baseApi, '<< baseApi');
		console.log(process.env.NODE_ENV, '<< node_env');
		axios
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				setShortUrl(res.data.url);
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	const copyToClipboard = (e) => {
		let currentNode = textAreaRef.current;
		// https://stackoverflow.com/a/61606470/3630417
		if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			range.moveToElementText(currentNode);
			range.select();
			document.execCommand('copy');
			range.remove();
		} else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(currentNode);
			selection.removeAllRanges();
			selection.addRange(range);
			document.execCommand('copy');
			selection.removeAllRanges();
		}
	};

	return (
		<div>
			{/* if there is an error it displays the message on top */}
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
			{/* it displays the return short url returned by the server */}
			<ReturnedShortUrl
				shortUrl={shortUrl}
				copyToClipboard={copyToClipboard}
				textAreaRef={textAreaRef}
			/>
			{/* <h2 ref={textAreaRef}>{shortUrl ? `${hostname}${shortUrl}` : null}</h2>
			<button onClick={copyToClipboard}>Copy to clipboard</button> */}
		</div>
	);
};

export default AddUrl;
