import React from 'react';
import styled from 'styled-components';

// helpers
import baseApi from '../../Config/config';
import axiosInstance from '../../Config/axios';

const StyledButton = styled.button`
	border: none;
	height: 2rem;
	background-color: #187bcd;
	font-size: 1rem;
	color: white;
	@media (max-width: 600px) {
		margin: 0.2rem;
	}
`;

const Logout = ({ history, setDisplayMessage, setIsLoggedIn, setShortUrl }) => {
	const logOutHandler = () => {
		axiosInstance
			.get(`${baseApi}/auth/logout`)
			.then((res) => {
				setIsLoggedIn(false);
				setShortUrl(null);
				history.push('/login');
			})
			.catch((error) => {
				setDisplayMessage(error.message);
			});
	};
	return <StyledButton onClick={logOutHandler}>Logout</StyledButton>;
};

export default Logout;
