import getAnswersData from './modules/getAnswersData';
import postQuizzesData from './modules/postQuizzesData';
import quizPercentParser from './modules/quizPercentParser';
import responseFormPatcher from './modules/responseFormPatcher';
import pathsParserUtil from './utils/pathsParser.util';
import quizzesDataUtil from './utils/quizzesData.util';

async function bootstrap() {
	const userId = parseInt(document.querySelector('[data-userid]')?.getAttribute('data-userid') ?? '0');

	const paths = pathsParserUtil();
	const attempt = new URL(window.location.href).searchParams.get('attempt');

	const responseForm = document.getElementById('responseform');
	const quizAttemptTable = document.querySelector('.generaltable.quizattemptsummary');

	if (paths.module) {
		if (responseForm) {
			console.log('Обнаружен блок ответов =>', responseForm);

			if (attempt) responseFormPatcher(paths.module.id, attempt, responseForm);
			getAnswersData(paths.module.id, responseForm);
		}

		if (quizAttemptTable) {
			console.log('Обнаружена таблица с результатами =>', quizAttemptTable);

			quizPercentParser(paths.module.id, quizAttemptTable);
		}
	}

	const responses = await postQuizzesData(userId, paths);
	if (responses.length) console.log('Все результаты тестов были отправлены =>', responses);

	console.log(quizzesDataUtil.entries());
}
void bootstrap();
