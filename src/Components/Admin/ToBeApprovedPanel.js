import React from 'react';
import styled from 'styled-components';

import UserToBeApproved from './UserToBeApproved';
import BackButton from './Navigation/BackButton';

const StyledSection = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
`;

const StyledDiv = styled.div`
	border: 1px solid red;
	min-height: 100px;
`;

const ToBeApprovedPanel = ({
	loggedUser,
	usersToBeApproved,
	setUsersToBeApproved,
	match,
}) => {
	return (
		<StyledSection>
			{!loggedUser.admin || usersToBeApproved.length === 0 ? (
				'Nothing to approve'
			) : (
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
			)}

			<BackButton match={match} />
		</StyledSection>
	);
};

export default ToBeApprovedPanel;
