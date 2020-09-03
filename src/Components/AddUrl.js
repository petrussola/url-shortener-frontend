// components
import ReturnedShortUrl from './ReturnedShortUrl';
import ListUrlsUser from './ListUrlsUser';

// helpers
import baseApi from '../Config/config';
import axiosInstance from '../Config/axios';

// dependencies
import React, { useState, useRef } from 'react';
require('dotenv').config();

const AddUrl = ({
	location,
	match,
	history,
	shortUrl,
	setShortUrl,
	setListUrlsUser,
	listUrlsUser,
}) => {
	const [urlInput, setUrlInput] = useState('');
	const [protocolInput, setProtocolInput] = useState('https://');
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const textAreaRef = useRef(null);

	const changeUrlHandler = (e) => {
		setUrlInput(e.target.value);
	};

	const changeProtocolHandler = (e) => {
		setProtocolInput(e.target.value);
	};

	const shortenUrl = (e) => {
		e.preventDefault();
		// set loading state to ture
		setIsLoading(true);
		// clean input field
		setUrlInput('');
		// add https or http
		const newUrl = `${protocolInput}${urlInput}`;
		// api call
		axiosInstance
			.post(`${baseApi}/create-url`, { newUrl })
			.then((res) => {
				// clean loading state
				setIsLoading(false);
				setShortUrl(res.data.url);
				// updates local state with new url linked to a user
				setListUrlsUser(res.data.urlsUser);
			})
			.catch((error) => {
				// clean loading state
				setIsLoading(false);
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
			{isLoading ? <h5>Loading...</h5> : null}
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
			{/* display list of urls by the same user */}
			<ListUrlsUser listUrlsUser={listUrlsUser} />
		</div>
	);
};

export default AddUrl;
