import quizzesDataUtil from './quizzesData.util';

export default function (cmId: number) {
	const quizzesDataKeys = Array.from(quizzesDataUtil.keys());

	let attempt = -1;

	quizzesDataKeys.forEach((key) => {
		const [keyCmId, keyAttempt] = key.split('_').map(Number);

		if (keyCmId === cmId && keyAttempt > attempt) {
			attempt = keyAttempt;
		}
	});

	if (attempt !== -1) {
		quizzesDataKeys.forEach((key) => {
			if (key.startsWith(cmId.toString()) && key !== `${cmId}_${attempt}`) {
				quizzesDataUtil.delete(key);
			}
		});
	}

	return attempt;
}
