import React, { useEffect } from 'react';

// helpers
import baseApi from '../Config/config';
import axiosInstance from '../Config/axios';

const FetchUrl = ({
	match,
	redirect,
	setRedirect,
	error,
	setError,
	newUrl,
	setNewUrl,
	isLoggedIn,
}) => {
	// grab the param after '/' in the url because this points to the real URL in the server
	const { shortUrl } = match.params;
	// fetch real URL from the server by passing the url param
	useEffect(() => {
		axiosInstance
			.get(`${baseApi}/${shortUrl}`)
			.then((res) => {
				// if server returns data, we set state
				if (res.data.status === 'success') {
					setRedirect(true);
					setNewUrl(res.data.longUrl);
				} else if (res.data.status === 'fail') {
					setError(true);
					setRedirect(false);
				}
			})
			// if server returns error
			.catch((error) => {
				setError(true);
				setRedirect(false);
			});
	}, [setError, setNewUrl, setRedirect, shortUrl]);
	// when we have data back from server and not an error
	if (isLoggedIn) {
		return null;
	} else if (redirect && !error) {
		// redirect to new url
		window.location.href = newUrl;
		return <div>Redirecting...</div>;
		// if we get no data from server (i.e. there is no short url stored with the param indicated by the User)
	} else if (!redirect && error) {
		return <div>There was an error</div>;
		// fallback option
	} else {
		return <div>Checking url...</div>;
	}
};

export default FetchUrl;
