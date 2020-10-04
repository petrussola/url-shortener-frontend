import React, { useRef } from 'react';
import styled from 'styled-components';

// helpers
import copyToClipboard from '../Helpers/helpers';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	max-width: 80vw;
	margin: 0.2rem auto;
	h3 {
		padding: 0.5rem;
		border: 1px solid #187bcd;
		margin: 0.5rem 0;
		@media (max-width: 600px) {
			font-size: 0.75rem;
		}
	}
	h3#shortened {
		background-color: #187bcd;
		color: white;
	}
`;

const UrlItem = ({ url }) => {
	const textAreaRef = useRef(null);
	// set hostname to show user
	const hostname = window.location.href;
	return (
		<StyledDiv>
			<h3>{url.longUrl}</h3>
			<h3 id='shortened' ref={textAreaRef}>{`${hostname}${url.shortUrl}`}</h3>
			<h3 onClick={() => copyToClipboard(textAreaRef)}>Copy to Clipboard</h3>
		</StyledDiv>
	);
};

export default UrlItem;
