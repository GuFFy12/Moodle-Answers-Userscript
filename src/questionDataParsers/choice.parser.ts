import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
		.sort((a, b) => {
			return htmlFormatterUtil(a.nextElementSibling ?? new Element()).localeCompare(
				htmlFormatterUtil(b.nextElementSibling ?? new Element()),
			);
		})
		.reduce((items: Element[], item, index) => {
			if (!(item instanceof HTMLInputElement) || item.id.includes(':flaggedcheckbox')) return items;

			questionData.answerOptions.push(htmlFormatterUtil(item.nextElementSibling ?? new Element()));

			questionData.answers.push(index.toString());

			items.push(item);
			return items;
		}, []);
}
