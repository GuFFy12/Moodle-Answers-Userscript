import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('div[role="textbox"]'))
		.filter((item): item is HTMLDivElement => item instanceof HTMLDivElement)
		.reduce((items: Element[], item) => {
			questionData.answers.push(htmlFormatterUtil(item));

			items.push(item);
			return items;
		}, []);
}
