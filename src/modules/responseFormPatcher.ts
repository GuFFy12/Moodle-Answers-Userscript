import quizzesDataUtil from '../utils/quizzesData.util';
import questionDataParser from './questionDataParser';

export default function (cmId: number, attempt: string, responseForm: HTMLElement) {
	responseForm.addEventListener('submit', () => {
		const quizData = quizzesDataUtil.get(`${cmId}_${attempt}`) ?? { questionsData: {} };

		Object.assign(quizData.questionsData, questionDataParser(responseForm));

		quizzesDataUtil.set(`${cmId}_${attempt}`, quizData);

		console.log('Сохранен блок ответов =>', quizData);
	});
}
