import React, { useState } from 'react';

const AddUrl = () => {
	const [urlInput, setUrlInput] = useState('');

	const changeUrlHandler = (e) => {
		console.log(e.target.value);
		setUrlInput(e.target.value);
	};

	return (
		<form>
			<label htmlFor='url-input'>https://</label>
			<input
				type='text'
				id='url-input'
				value={urlInput}
				placeholder='Add your URL'
				onChange={(e) => changeUrlHandler(e)}
			/>
			<button type='submit'>Shorten URL</button>
		</form>
	);
};

export default AddUrl;
