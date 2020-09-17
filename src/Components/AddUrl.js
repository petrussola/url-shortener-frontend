// components
import ReturnedShortUrl from './ReturnedShortUrl';
import ListUrlsUser from './ListUrlsUser';

// helpers
import baseApi from '../Config/config';
import axiosInstance from '../Config/axios';

// dependencies
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
require('dotenv').config();

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	border: 1px solid #cccccc;
	width: 50vw;
	min-height: 30vh;
	margin: 100px auto;
	border-radius: 4px;
	box-shadow: 2px 4px 5px #cccccc;
	color: #7c7c7c;
	@media (max-width: 600px) {
		width: 90%;
	}
	form {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
		align-items: center;
		width: 80%;
		margin: 1rem auto;
		@media (max-width: 600px) {
			width: 90%;
		}
		select {
			flex-grow: 1;
			height: 2rem;
			font-size: 1rem;
			@media (max-width: 600px) {
				margin: 0.2rem;
			}
		}
		input {
			flex-grow: 1;
			height: 2rem;
			padding: 0.5rem 1rem;
			font-size: 1rem;
			@media (max-width: 600px) {
				margin: 0.2rem;
				height: 3rem;
				width: 100%;
			}
		}
		button {
			flex-grow: 1;
			border: none;
			height: 2rem;
			background-color: #187bcd;
			font-size: 1rem;
			color: white;
			@media (max-width: 600px) {
				margin: 0.2rem;
			}
		}
	}
`;

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
			<StyledDiv>
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
			</StyledDiv>
			{/* display list of urls by the same user */}
		</div>
	);
};

export default AddUrl;
