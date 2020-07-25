import React from 'react';

const ReturnedShortUrl = ({ shortUrl, copyToClipboard, textAreaRef }) => {
	// set hostname to show user
	const hostname = window.location.href;
	// if no returned url from server components doesn't display
	if (!shortUrl) {
		return null;
	}
	return (
		<div>
			<h2 ref={textAreaRef}>{`${hostname}${shortUrl}`}</h2>
			<button onClick={copyToClipboard}>Copy short URL to clipboard</button>
		</div>
	);
};

export default ReturnedShortUrl;
