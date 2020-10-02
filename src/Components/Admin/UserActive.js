import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	span {
		font-weight: bold;
	}
	div {
		padding: 0.2rem 1rem;
	}
`;

const UserActive = ({ user }) => {
	return (
		<StyledDiv>
			<div>
				<span>User id:</span> {user.id}
			</div>
			<div>
				<span>Email: </span>
				{user.email}
			</div>
			<div>
				<span>Admin privilege? </span>
				{user.admin ? 'true' : 'false'}
			</div>
			<div>
				<span>Approved for use? </span>
				{user.approved ? 'true' : 'false'}
			</div>
		</StyledDiv>
	);
};

export default UserActive;
