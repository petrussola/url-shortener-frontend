import React from 'react';
import styled from 'styled-components';

import UserToBeApproved from './UserToBeApproved';

const StyledDiv = styled.div`
	border: 1px solid red;
	min-height: 100px;
`;

const AdminPanel = ({ loggedUser, usersToBeApproved }) => {
	if (!loggedUser.admin || usersToBeApproved.length === 0) {
		return null;
	}
	return (
		<StyledDiv>
			{usersToBeApproved.map((user) => {
				return <UserToBeApproved user={user} key={user.id} />;
			})}
		</StyledDiv>
	);
};

export default AdminPanel;
