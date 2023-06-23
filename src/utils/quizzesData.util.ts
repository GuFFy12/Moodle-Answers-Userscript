import { QuizData } from '../types';

function quizzesDataUtil() {
	class QuizzesDataUtil implements Map<string, QuizData | undefined> {
		private map = new Map<string, QuizData | undefined>();

		private update() {
			const quizzesData = GM_getValue<string | undefined>('quizData', undefined);

			if (quizzesData) {
				try {
					this.map = new Map(Object.entries(JSON.parse(quizzesData) as Record<string, QuizData | undefined>));
					return;
				} catch (error) {
					console.log('Ошибка с локальными ответами на тест =>', error);
				}
			} else {
				console.log('Локальные ответы на тест не были найдены');
			}

			this.save();
		}

		private save() {
			GM_setValue('quizData', JSON.stringify(Object.fromEntries(this.map)));
		}

		get [Symbol.toStringTag]() {
			this.update();
			return this.map[Symbol.toStringTag];
		}
		get size() {
			this.update();
			return this.map.size;
		}

		[Symbol.iterator]() {
			this.update();
			return this.map.entries();
		}

		clear() {
			this.update();
			this.map.clear();
			this.save();
		}

		delete(key: string) {
			this.update();
			const mapDelete = this.map.delete(key);
			this.save();
			return mapDelete;
		}

		entries() {
			this.update();
			return this.map.entries();
		}

		forEach(
			callbackfn: (value: QuizData | undefined, key: string, map: Map<string, QuizData | undefined>) => void,
			thisArg?: unknown,
		) {
			this.update();
			return this.map.forEach(callbackfn, thisArg);
		}

		get(key: string) {
			this.update();
			return this.map.get(key);
		}

		has(key: string) {
			this.update();
			return this.map.has(key);
		}

		keys() {
			this.update();
			return this.map.keys();
		}

		set(key: string, value: QuizData | undefined) {
			this.update();
			this.map.set(key, value);
			this.save();
			return this;
		}

		values() {
			this.update();
			return this.map.values();
		}
	}

	return new QuizzesDataUtil();
}

export default quizzesDataUtil();
