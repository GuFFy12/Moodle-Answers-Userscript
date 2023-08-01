import { Md5 } from 'ts-md5';

import { AnswerData } from '../types';
import requestUtil from '../utils/request.util';
import questionDataParser from './questionDataParser';

export default function (moduleId: number, responseForm: Element, searchUsingModuleId?: boolean) {
	Object.entries(questionDataParser(responseForm)).forEach(async ([questionId, questionData]) => {
		const url = new URL('https://vernibabki.ru/ugatu-sdo-answers/getAnswerData');

		if (searchUsingModuleId) {
			url.searchParams.set('moduleId', moduleId.toString());
		}

		url.searchParams.set(
			'question_answerOptions_md5',
			Md5.hashStr(questionData.question + questionData.questionType + questionData.answerOptions.join()),
		);

		const response = await requestUtil({
			method: 'GET',
			url: url.toString(),
			timeout: 10000,
			responseType: 'json',
		}).promise;

		console.log('getAnswerData =>', response);

		if (response?.response && response.status === 200) {
			questionDataParser(responseForm, {
				[questionId]: response.response as AnswerData[],
			});
		}
	});
}
