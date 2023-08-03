import { QuestionData } from '../types';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="text"]'))
		.filter((item): item is HTMLInputElement => item instanceof HTMLInputElement)
		.reduce((items: Element[], item) => {
			questionData.answers.push(item.value);

			items.push(item);
			return items;
		}, []);
}
