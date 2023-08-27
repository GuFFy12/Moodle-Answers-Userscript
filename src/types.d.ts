export interface QuizData {
	percent?: number | null;
	questionsData: Record<string, QuestionData | undefined>;
}

export interface QuestionData {
	question: string;
	questionType: string;
	answerOptions: string[];
	answers: string[];
}

export interface Paths {
	course?: Path;
	section?: Path;
	module?: Path;
}

export interface Path {
	id: number;
	name: string;
}

export interface GroupedAnswer {
	_avg: {
		percent: number;
	};
	_count: {
		answers: number;
	};
	_max: {
		createdAt: string;
	};
	answers: string[];
}

export interface AnswerData {
	groupedAnswers: GroupedAnswer[];
	answersCount: number;
}
