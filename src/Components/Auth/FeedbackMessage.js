import React from 'react';
import styled from 'styled-components';

const StyledH5 = styled.h5`
	color: red;
`;

const FeedbackMessage = ({ displayMessage }) => {
	return <StyledH5>{displayMessage}</StyledH5>;
};

export default FeedbackMessage;
