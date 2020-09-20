import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
	border: 1px solid red;
	min-height: 100px;
`;

const AdminPanel = ({ loggedUser }) => {
	if (!loggedUser.admin) {
		return null;
	}
	return <StyledDiv>admin panel</StyledDiv>;
};

export default AdminPanel;
