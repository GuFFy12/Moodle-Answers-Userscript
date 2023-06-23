import { QuestionData } from '../types';
import innerHTMLFormatterUtil from '../utils/innerHTMLFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
		.sort((a, b) => {
			return innerHTMLFormatterUtil(a.nextElementSibling?.innerHTML ?? '').localeCompare(
				innerHTMLFormatterUtil(b.nextElementSibling?.innerHTML ?? ''),
			);
		})
		.reduce((items: Element[], item, index) => {
			if (!(item instanceof HTMLInputElement) || item.id.includes(':flaggedcheckbox')) return items;

			questionData.answerOptions.push(innerHTMLFormatterUtil(item.nextElementSibling?.innerHTML ?? ''));

			questionData.answers.push(index.toString());

			items.push(item);
			return items;
		}, []);
}
