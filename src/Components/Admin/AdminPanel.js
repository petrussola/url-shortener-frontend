import React from 'react';
import { Link } from 'react-router-dom';

import BackButton from './Navigation/BackButton';

const AdminPanel = ({ usersToBeApproved, match }) => {
	return (
		<section>
			<div>
				<Link to='/admin/approval'>
					{`Users to be approved `}
					<span>
						{usersToBeApproved.length > 0
							? `(${usersToBeApproved.length})`
							: ''}
					</span>
				</Link>
				<Link to='/admin/active'>Users active</Link>
			</div>
			<BackButton match={match} />
		</section>
	);
};

export default AdminPanel;
