import React from 'react';
import styled from 'styled-components';

// components
import UrlItem from './UrlItem';

const StyledDiv = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: space-around;
	align-items: center;
	max-width: 70vw;
	margin: 0 auto;
`;

const ListUrlsUser = ({ listUrlsUser }) => {
	if (listUrlsUser.length === 0) {
		return null;
	}
	return (
		<StyledDiv>
			{listUrlsUser.map((url) => {
				return <UrlItem url={url} key={url.shortUrl} />;
			})}
		</StyledDiv>
	);
};

export default ListUrlsUser;
