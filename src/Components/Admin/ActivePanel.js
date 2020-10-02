import React from 'react';
import UserActive from './UserActive';
import BackButton from './Navigation/BackButton';

const ActivePanel = ({ allUsers, match }) => {
	if (!allUsers || allUsers.length === 0) {
		return null;
	}
	return (
		<div>
			{allUsers.map((user) => {
				return <UserActive key={user.id} user={user} />;
			})}
			<BackButton match={match} />
		</div>
	);
};

export default ActivePanel;
