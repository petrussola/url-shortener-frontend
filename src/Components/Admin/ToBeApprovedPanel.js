import React from 'react';
import styled from 'styled-components';

import UserToBeApproved from './UserToBeApproved';

const StyledDiv = styled.div`
	border: 1px solid red;
	min-height: 100px;
`;

const ToBeApprovedPanel = ({
	loggedUser,
	usersToBeApproved,
	setUsersToBeApproved,
}) => {
	if (!loggedUser.admin || usersToBeApproved.length === 0) {
		return null;
	}
	return (
		<StyledDiv>
			{usersToBeApproved.map((user) => {
				return (
					<UserToBeApproved
						user={user}
						setUsersToBeApproved={setUsersToBeApproved}
						key={user.id}
					/>
				);
			})}
		</StyledDiv>
	);
};

export default ToBeApprovedPanel;
