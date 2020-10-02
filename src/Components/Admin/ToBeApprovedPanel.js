import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
		<section>
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
			<Link to='/admin'>Back</Link>
		</section>
	);
};

export default ToBeApprovedPanel;
