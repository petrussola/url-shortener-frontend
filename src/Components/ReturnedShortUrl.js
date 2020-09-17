import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: center;
	width: 80%;
	margin: 0 0 1rem 0;
	@media (max-width: 600px) {
		width: 90%;
		flex-direction: column;
	}
	h4 {
		color: #187bcd;
		@media (max-width: 600px) {
			width: 100%;
		}
	}
	button {
		flex-grow: 1;
		border: none;
		height: 2rem;
		background-color: white;
		font-size: 1rem;
		color: #187bcd;
		border: 1px solid #187bcd;
		max-width: 30%;
		@media (max-width: 600px) {
			margin: 0.2rem;
			max-width: 100%;
		}
	}
`;

const ReturnedShortUrl = ({ shortUrl, copyToClipboard, textAreaRef }) => {
	// set hostname to show user
	const hostname = window.location.href;
	// if no returned url from server components doesn't display
	if (!shortUrl) {
		return null;
	}
	return (
		<StyledDiv>
			<h4 ref={textAreaRef}>{`${hostname}${shortUrl}`}</h4>
			<button onClick={copyToClipboard}>Copy to clipboard</button>
		</StyledDiv>
	);
};

export default ReturnedShortUrl;
