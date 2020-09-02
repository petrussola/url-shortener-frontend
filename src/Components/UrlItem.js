import React from 'react';

const UrlItem = ({ url }) => {
	// set hostname to show user
	const hostname = window.location.href;
	return (
		<div>
			<h3>{url.longUrl}</h3>
			<h3>{`${hostname}${url.shortUrl}`}</h3>
		</div>
	);
};

export default UrlItem;
