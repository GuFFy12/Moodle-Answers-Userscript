import { QuestionData } from '../types';
import innerHTMLFormatterUtil from '../utils/innerHTMLFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="text"]')).reduce((items: Element[], item) => {
		if (!(item instanceof HTMLInputElement)) return items;

		questionData.answers.push(innerHTMLFormatterUtil(item.value));

		items.push(item);
		return items;
	}, []);
}
