import questionDataParsers from '../questionDataParsers';
import { AnswerData, QuestionData } from '../types';
import innerHTMLParserUtil from '../utils/innerHTMLFormatter.util';
import answersDataSelector from './answersDataSelector';

export default function (responseForm: Element, answersData?: Record<string, AnswerData[]>) {
	return Array.from(responseForm.querySelectorAll('div > *[id^="question"]')).reduce(
		(questionsData: Record<string, QuestionData>, questionBlockElement) => {
			questionsData[questionBlockElement.id] = {
				question: innerHTMLParserUtil(questionBlockElement.querySelector('.qtext')?.innerHTML ?? ''),
				answerOptions: [],
				answers: [],
			};

			const items = Object.values(questionDataParsers).reduce((items: Element[], parser) => {
				const item = parser(questionBlockElement, questionsData[questionBlockElement.id]);

				items.push(...item);
				return items;
			}, []);

			if (answersData) answersDataSelector(questionBlockElement, answersData[questionBlockElement.id], items);

			return questionsData;
		},
		{},
	);
}
