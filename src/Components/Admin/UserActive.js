import React from 'react';
import styled from 'styled-components';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

const StyledDiv = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-items: center;
	justify-content: center;
	span {
		font-weight: bold;
	}
	div {
		padding: 0.2rem 1rem;
	}
`;

const UserActive = ({ user, setUsersToBeApproved, setAllUsers }) => {
	const disapproveUser = async (id) => {
		try {
			const res = await axiosInstance.post(`${baseApi}/auth/unapprove-user`, {
				id,
			});
			setUsersToBeApproved(res.data.tobeapproved);
			setAllUsers(res.data.allUsers);
		} catch (error) {
			console.log(error.message);
			debugger;
		}
	};
	return (
		<StyledDiv>
			<div>
				<span>User id:</span> {user.id}
			</div>
			<div>
				<span>Email: </span>
				{user.email}
			</div>
			<div>
				<span>Admin privilege? </span>
				{user.admin ? 'true' : 'false'}
			</div>
			<div>
				<span>Approved for use? </span>
				{user.approved ? 'true' : 'false'}
			</div>
			<div>
				<span>Count of urls: </span>
				{user.count}
			</div>
			<button onClick={() => disapproveUser(user.id)}>Disapprove</button>
		</StyledDiv>
	);
};

export default UserActive;
