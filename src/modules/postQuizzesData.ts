import { Paths } from '../types';
import quizzesDataUtil from '../utils/quizzesData.util';
import requestUtil from '../utils/request.util';

export default async function (userId: string, paths: Paths) {
	const responses: (Tampermonkey.ErrorResponse | Tampermonkey.Response<object> | undefined)[] = [];

	for (const [quizId, quizData] of quizzesDataUtil.entries()) {
		if (quizData?.percent === undefined) {
			continue;
		}

		const response = await requestUtil({
			method: 'POST',
			url: 'https://vernibabki.ru/ugatu-sdo-answers/postQuizData',
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				userId,
				paths,
				percent: quizData.percent,
				questionsData: Object.values(quizData.questionsData),
			}),
		}).promise;

		console.log(`postQuizData => `, response);

		if (response && (response.status === 201 || response.status === 400)) {
			quizzesDataUtil.delete(quizId);
		}

		responses.push(response);
	}

	return responses;
}
