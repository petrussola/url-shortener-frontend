import React from 'react';
import styled from 'styled-components';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

const StyledDiv = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const UserToBeApproved = ({ user, setUsersToBeApproved, setAllUsers }) => {
	const approveHandler = async () => {
		try {
			const res = await axiosInstance.post(`${baseApi}/auth/approve-user`, {
				id: user.id,
			});
			setUsersToBeApproved(res.data.tobeapproved);
			setAllUsers(res.data.allUsers);
		} catch (error) {}
	};

	return (
		<StyledDiv>
			<p>{user.email}</p>
			<button onClick={() => approveHandler(user)}>Approve</button>
		</StyledDiv>
	);
};

export default UserToBeApproved;
