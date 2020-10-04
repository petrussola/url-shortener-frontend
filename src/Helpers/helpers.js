const copyToClipboard = (textAreaRef) => {
	let currentNode = textAreaRef.current;
	// https://stackoverflow.com/a/61606470/3630417
	if (document.body.createTextRange) {
		const range = document.body.createTextRange();
		range.moveToElementText(currentNode);
		range.select();
		document.execCommand('copy');
		range.remove();
	} else if (window.getSelection) {
		const selection = window.getSelection();
		const range = document.createRange();
		range.selectNodeContents(currentNode);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');
		selection.removeAllRanges();
	}
};

export default copyToClipboard;
