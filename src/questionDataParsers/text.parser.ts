import { QuestionData } from '../types';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('input[type="text"]')).reduce((items: Element[], item) => {
		if (!(item instanceof HTMLInputElement)) return items;

		questionData.answers.push(item.value);

		items.push(item);
		return items;
	}, []);
}
