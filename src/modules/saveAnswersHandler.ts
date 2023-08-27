import quizzesDataUtil from '../utils/quizzesData.util';
import responseFormParser from './questionsDataParser';

export default function (cmId: number, attempt: string, responseForm: HTMLElement) {
	responseForm.addEventListener('submit', () => {
		const quizData = quizzesDataUtil.get(`${cmId}_${attempt}`) ?? { questionsData: {} };

		Object.assign(quizData.questionsData, responseFormParser(responseForm).questionsData);

		quizzesDataUtil.set(`${cmId}_${attempt}`, quizData);

		console.log('Сохранен блок ответов =>', quizData);
	});
}
