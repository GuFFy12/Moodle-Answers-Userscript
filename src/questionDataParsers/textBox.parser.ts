import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('div[role="textbox"]')).reduce((items: Element[], item) => {
		if (!(item instanceof HTMLDivElement)) return items;

		questionData.answers.push(htmlFormatterUtil(item));

		items.push(item);
		return items;
	}, []);
}
