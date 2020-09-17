import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	max-width: 80vw;
	margin: 0.2rem auto;
	h3 {
		padding: 0.2rem;
		border: 1px solid #187bcd;
		padding: 0.5rem;
	}
	h3#shortened {
		background-color: #187bcd;
		color: white;
	}
`;

const UrlItem = ({ url }) => {
	// set hostname to show user
	const hostname = window.location.href;
	return (
		<StyledDiv>
			<h3>{url.longUrl}</h3>
			<h3 id='shortened'>{`${hostname}${url.shortUrl}`}</h3>
		</StyledDiv>
	);
};

export default UrlItem;
