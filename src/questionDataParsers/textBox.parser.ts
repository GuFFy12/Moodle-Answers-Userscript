import { QuestionData } from '../types';
import innerHTMLFormatterUtil from '../utils/innerHTMLFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('div[role="textbox"]')).reduce((items: Element[], item) => {
		if (!(item instanceof HTMLDivElement)) return items;

		questionData.answers.push(innerHTMLFormatterUtil(item.innerHTML));

		items.push(item);
		return items;
	}, []);
}
