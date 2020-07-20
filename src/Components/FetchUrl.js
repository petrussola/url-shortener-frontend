import React, { useEffect } from 'react';
import axios from 'axios';

const FetchUrl = (props) => {
	const { shortUrl } = props.match.params;
	useEffect(() => {
		axios
			.get(`http://localhost:5000/${shortUrl}`)
			.then((res) => {
				debugger;
			})
			.catch((error) => {
				debugger;
			});
	}, []);
	return <div>hello</div>;
};

export default FetchUrl;
