import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('select'))
		.sort((a, b) => {
			return htmlFormatterUtil(a.parentElement?.previousElementSibling ?? new Element()).localeCompare(
				htmlFormatterUtil(b.parentElement?.previousElementSibling ?? new Element()),
			);
		})
		.reduce((items: Element[], item) => {
			if (!(item instanceof HTMLSelectElement)) return items;

			const sortedOptions = Array.from(item.options)
				.sort((a, b) => {
					return htmlFormatterUtil(a).localeCompare(htmlFormatterUtil(b));
				})
				.map((element) => htmlFormatterUtil(element));

			questionData.answerOptions.push(
				htmlFormatterUtil(item.parentElement?.previousElementSibling ?? new Element()),
				sortedOptions.length.toString(),
				...sortedOptions,
			);

			const selectedOption = htmlFormatterUtil(item.options[item.selectedIndex]);

			questionData.answers.push(sortedOptions.indexOf(selectedOption).toString());

			items.push(item);
			return items;
		}, []);
}
