import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('select'))
		.filter((item): item is HTMLSelectElement => item instanceof HTMLSelectElement)
		.sort((a, b) => {
			return htmlFormatterUtil(a.parentElement?.previousElementSibling).localeCompare(
				htmlFormatterUtil(b.parentElement?.previousElementSibling),
			);
		})
		.reduce((items: Element[], item) => {
			const sortedOptions = Array.from(item.options)
				.sort((a, b) => {
					return htmlFormatterUtil(a).localeCompare(htmlFormatterUtil(b));
				})
				.map((element) => htmlFormatterUtil(element));

			questionData.answerOptions.push(
				htmlFormatterUtil(item.parentElement?.previousElementSibling),
				sortedOptions.length.toString(),
				...sortedOptions,
			);

			const selectedOption = htmlFormatterUtil(item.options[item.selectedIndex]);

			questionData.answers.push(sortedOptions.indexOf(selectedOption).toString());

			items.push(item);
			return items;
		}, []);
}
