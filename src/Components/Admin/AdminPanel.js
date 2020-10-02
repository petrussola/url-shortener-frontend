import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = ({ usersToBeApproved }) => {
	return (
		<div>
			<Link to='/admin/approval'>
				{`Users to be approved `}
				<span>
					{usersToBeApproved.length > 0 ? `(${usersToBeApproved.length})` : ''}
				</span>
			</Link>
			<Link to='/admin/active'>Users active</Link>
		</div>
	);
};

export default AdminPanel;
