import highestAttemptFinderUtil from '../utils/highestAttemptFinder.util';
import quizzesDataUtil from '../utils/quizzesData.util';

export default function (cmId: number, quizAttemptTable: Element) {
	const attempt = highestAttemptFinderUtil(cmId);

	const quizData = quizzesDataUtil.get(`${cmId}_${attempt}`);
	if (!quizData) return console.log('Quiz is not started');

	const ratesColumn = quizAttemptTable.querySelectorAll('td.cell.c2');
	const score = ratesColumn[ratesColumn.length - 2].innerHTML;

	const rateHeader = quizAttemptTable.querySelectorAll('th.header.c2')[0];
	const maxScore = rateHeader.innerHTML.replace(/[^\d,]/g, '').replace(',', '.');

	const percent = (parseFloat(score) / parseFloat(maxScore)) * 100;

	if (!isNaN(percent)) {
		console.log('Процент за тест =>', percent);

		quizzesDataUtil.set(`${cmId}_${attempt}`, Object.assign(quizData, { percent }));

		return;
	}

	switch (score) {
		case 'Еще не оценено':
			console.log('Тест ещё не оценён');
			quizzesDataUtil.set(`${cmId}_${attempt}`, Object.assign(quizData, { percent: null }));
			break;
		case '':
			console.log('Тест ещё не закончен');
			break;
		default:
			console.log('Невозможно поулчить результат теста');
	}
}
