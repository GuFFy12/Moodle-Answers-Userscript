import { Paths } from '../types';
import innerHTMLFormatterUtil from './innerHTMLFormatter.util';

export default function () {
	return Array.from(document.querySelectorAll('.breadcrumb li')).reduce((paths: Paths, path, index) => {
		if (index < 2) return paths;

		const searchParams = new URL(
			(path.querySelector('a[itemprop="url"]') ?? new Element()).getAttribute('href') ?? '',
		).searchParams;

		paths[(['course', 'section', 'module'] as const)[index - 2]] = {
			id: parseInt((searchParams.get('section') ? searchParams.get('section') : searchParams.get('id')) ?? ''),
			name: innerHTMLFormatterUtil(path.querySelector('span[itemprop="title"]')?.innerHTML ?? ''),
		};

		return paths;
	}, {});
}
