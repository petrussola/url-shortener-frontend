import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	border: 1px solid red;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	max-width: 80vw;
	margin: 0.5rem auto;
	h3 {
		padding: 0.2rem;
	}
`;

const UrlItem = ({ url }) => {
	// set hostname to show user
	const hostname = window.location.href;
	return (
		<StyledDiv>
			<h3>{url.longUrl}</h3>
			<h3>{`${hostname}${url.shortUrl}`}</h3>
		</StyledDiv>
	);
};

export default UrlItem;
