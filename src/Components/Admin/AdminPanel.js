import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BackButton from './Navigation/BackButton';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const AdminPanel = ({ usersToBeApproved, match }) => {
	return (
		<section>
			<StyledDiv>
				<Link to='/admin/approval'>
					{`Users to be approved `}
					<span>
						{usersToBeApproved.length > 0
							? `(${usersToBeApproved.length})`
							: ''}
					</span>
				</Link>
				<Link to='/admin/active'>Users active</Link>
			</StyledDiv>
			<BackButton match={match} />
		</section>
	);
};

export default AdminPanel;
