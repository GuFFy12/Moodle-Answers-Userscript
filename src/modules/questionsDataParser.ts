import questionDataParsers from '../questionDataParsers';
import { QuestionData } from '../types';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (responseForm: Element) {
	return Array.from(responseForm.querySelectorAll('div > *[id^="question"]')).reduce(
		(
			accumulator: { questionsData: Record<string, QuestionData>; answersItems: Element[][] },
			questionBlockElement,
		) => {
			accumulator.questionsData[questionBlockElement.id] = {
				question: htmlFormatterUtil(questionBlockElement.querySelector('.qtext')),
				questionType: questionBlockElement.className.split(' ')[1],
				answerOptions: [],
				answers: [],
			};

			accumulator.answersItems.push(
				Object.values(questionDataParsers).flatMap((parser) =>
					parser(questionBlockElement, accumulator.questionsData[questionBlockElement.id]),
				),
			);

			return accumulator;
		},
		{ questionsData: {}, answersItems: [] },
	);
}
