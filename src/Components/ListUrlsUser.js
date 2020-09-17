import React from 'react';

// components
import UrlItem from './UrlItem';

const ListUrlsUser = ({ listUrlsUser }) => {
	if (listUrlsUser.length === 0) {
		return null;
	}
	return (
		<div>
			{listUrlsUser.map((url) => {
				return <UrlItem url={url} key={url.shortUrl} />;
			})}
		</div>
	);
};

export default ListUrlsUser;
