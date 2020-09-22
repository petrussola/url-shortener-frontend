import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const UserToBeApproved = ({ user }) => {
	const approveHandler = () => {
		console.log('yay');
	};

	return (
		<StyledDiv>
			<p>{user.email}</p>
			<button onClick={approveHandler}>Approve</button>
		</StyledDiv>
	);
};

export default UserToBeApproved;
