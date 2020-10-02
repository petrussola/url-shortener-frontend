import React from 'react';
import UserActive from './UserActive';
import { Link } from 'react-router-dom';

const ActivePanel = ({ allUsers }) => {
	if (!allUsers || allUsers.length === 0) {
		return null;
	}
	return (
		<div>
			{allUsers.map((user) => {
				return <UserActive key={user.id} user={user} />;
			})}
			<Link to='/admin'>Back</Link>
		</div>
	);
};

export default ActivePanel;
