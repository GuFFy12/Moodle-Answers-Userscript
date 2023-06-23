import { QuestionData } from '../types';
import innerHTMLFormatterUtil from '../utils/innerHTMLFormatter.util';

export default function (questionBlockElement: Element, questionData: QuestionData) {
	return Array.from(questionBlockElement.querySelectorAll('select'))
		.sort((a, b) => {
			return innerHTMLFormatterUtil(a.parentElement?.previousElementSibling?.innerHTML ?? '').localeCompare(
				innerHTMLFormatterUtil(b.parentElement?.previousElementSibling?.innerHTML ?? ''),
			);
		})
		.reduce((items: Element[], item) => {
			if (!(item instanceof HTMLSelectElement)) return items;

			const sortedOptions = Array.from(item.options)
				.sort((a, b) => {
					return innerHTMLFormatterUtil(a.innerHTML).localeCompare(innerHTMLFormatterUtil(b.innerHTML));
				})
				.map((element) => innerHTMLFormatterUtil(element.innerHTML));

			questionData.answerOptions.push(
				`${innerHTMLFormatterUtil(
					item.parentElement?.previousElementSibling?.innerHTML ?? '',
				)} — ${sortedOptions.join(', ')}`,
			);

			const selectedOption = innerHTMLFormatterUtil(item.options[item.selectedIndex].innerHTML);

			questionData.answers.push(
				(sortedOptions.indexOf(selectedOption) + questionData.answerOptions.length - 1).toString(),
			);

			questionData.answerOptions.push(...sortedOptions);

			items.push(item);
			return items;
		}, []);
}
