export default function (elements: Element) {
	const div = document.createElement('div');
	div.innerHTML = elements.innerHTML;

	for (const element of div.getElementsByTagName('*')) {
		const attributesArray = Array.from(element.attributes);

		for (const attribute of attributesArray) {
			if (attribute.name !== 'src') {
				element.removeAttribute(attribute.name);
			} else {
				if (!(element instanceof HTMLImageElement)) {
					if (!attribute.value.match(/https:\/\/[\w./]+\/pluginfile\.php\/.*?/g)) continue;

					const url = attribute.value.split('/');
					url[7] = 'QUBAID';
					url[8] = 'SLOT';

					attribute.value = url.join('/');
				} else {
					const canvas = document.createElement('canvas');

					canvas.width = element.width;
					canvas.height = element.height;

					const ctx = canvas.getContext('2d');
					if (ctx) ctx.drawImage(element, 0, 0);

					attribute.value = canvas.toDataURL();
				}
			}
		}
	}

	return div.innerHTML;
}
