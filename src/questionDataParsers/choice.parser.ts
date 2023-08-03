import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
		.filter(
			(item): item is HTMLInputElement =>
				item instanceof HTMLInputElement && !item.id.includes(':flaggedcheckbox'),
		)
		.sort((a, b) => {
			return htmlFormatterUtil(a.nextElementSibling).localeCompare(htmlFormatterUtil(b.nextElementSibling));
		})
		.reduce((items: Element[], item, index) => {
			questionData.answerOptions.push(htmlFormatterUtil(item.nextElementSibling));

			if (item.checked) questionData.answers.push(index.toString());

			items.push(item);
			return items;
		}, []);
}
