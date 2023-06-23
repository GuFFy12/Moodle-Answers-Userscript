export default function (innerHTML: string) {
	const regexp = RegExp(/"https:\/\/[\w./]+\/pluginfile\.php\/.*?"/, 'g');

	let match: RegExpExecArray | null;
	while ((match = regexp.exec(innerHTML)) !== null) {
		let newUrl = '';

		const imgElement = document.querySelector(`img[src=${match[0]}]`);

		if (!imgElement || !(imgElement instanceof HTMLImageElement)) {
			const url = match[0].split('/');
			url[7] = 'QUBAID';
			url[8] = 'SLOT';

			newUrl = url.join('/');
		} else {
			const canvas = document.createElement('canvas');

			canvas.width = imgElement.width;
			canvas.height = imgElement.height;

			const ctx = canvas.getContext('2d');
			if (ctx) ctx.drawImage(imgElement, 0, 0);

			newUrl = canvas.toDataURL();
		}

		innerHTML = innerHTML.replace(match[0], newUrl);
	}

	return innerHTML;
}
