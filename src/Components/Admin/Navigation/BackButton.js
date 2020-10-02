import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({ match }) => {
	const arr = match.path.split('/');
	const currPage = arr[arr.length - 1];
	const parentPath = arr
		.filter((item) => {
			return item !== currPage;
		})
		.join('/');
	return <Link to={parentPath}>{`<-- Back`}</Link>;
};

export default BackButton;
