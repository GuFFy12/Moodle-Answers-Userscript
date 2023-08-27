import { Md5 } from 'ts-md5';

import requestUtil from '../utils/request.util';
import answersDataSelector from './answersDataSelector';
import responseFormParser from './questionsDataParser';

export default function (moduleId: number, responseForm: Element, searchUsingModuleId?: boolean) {
	const parsedResponseForm = responseFormParser(responseForm);

	Object.entries(parsedResponseForm.questionsData).forEach(async ([questionId, questionData], index) => {
		const url = new URL('http://localhost:3000/getAnswerData');

		if (searchUsingModuleId) {
			url.searchParams.set('moduleId', moduleId.toString());
		}

		url.searchParams.set(
			'question_questionType_answerOptions_md5',
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
			answersDataSelector(
				document.getElementById(questionId) ?? document.createElement('div'),
				parsedResponseForm.answersItems[index],
				response.response,
			);
		}
	});
}
