import { AnswerData } from '../types';
import applyThTdStyleUtil from '../utils/applyThTdStyle.util';
import htmlFormatterUtil from '../utils/htmlFormatter.util';

export default function (questionBlockElement: Element, answersData: AnswerData[], items: Element[]) {
	const table = document.createElement('table');
	questionBlockElement.appendChild(table);
	table.style.marginLeft = 'auto';
	table.style.marginRight = 'auto';
	table.style.borderCollapse = 'collapse';
	table.style.tableLayout = 'fixed';
	table.style.width = '80%';

	if (!answersData.length) {
		const headerRow = document.createElement('tr');
		table.appendChild(headerRow);
		headerRow.style.backgroundColor = `rgba(221,221,221,0.6)`;

		const noData = document.createElement('th');
		headerRow.appendChild(noData);
		noData.textContent = 'Никто ещё не решал этот вопрос :^(';
		applyThTdStyleUtil(noData);

		return;
	}

	const headerRow = document.createElement('tr');
	table.appendChild(headerRow);

	const percentHeader = document.createElement('th');
	headerRow.appendChild(percentHeader);
	percentHeader.textContent = 'Процент';
	applyThTdStyleUtil(percentHeader);

	const usageHeader = document.createElement('th');
	headerRow.appendChild(usageHeader);
	usageHeader.textContent = 'Количество использований';
	applyThTdStyleUtil(usageHeader);

	const lastUsageHeader = document.createElement('th');
	headerRow.appendChild(lastUsageHeader);
	lastUsageHeader.textContent = 'Последний раз';
	applyThTdStyleUtil(lastUsageHeader);

	answersData.forEach((answerData, index) => {
		let percentColor: string;
		switch (true) {
			case answerData._avg.percent > 80:
				percentColor = 'rgba(168,228,160,0.6)';
				break;
			case answerData._avg.percent > 60:
				percentColor = 'rgba(255,219,139,0.6)';
				break;
			default:
				percentColor = 'rgba(255,155,172,0.6)';
		}

		const lastUsed = new Date(answerData._max.createdAt);
		const timeDiff = Math.abs(new Date().getTime() - lastUsed.getTime());
		const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
		const diffHours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
		const diffMinutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
		const diffSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

		let lastUsedText;
		switch (true) {
			case diffDays > 0:
				lastUsedText = `${diffDays} дня ${diffHours} часов`;
				break;
			case diffHours > 0:
				lastUsedText = `${diffHours} часов ${diffMinutes} минут`;
				break;
			case diffMinutes > 0:
				lastUsedText = `${diffMinutes} минут ${diffSeconds} секунд`;
				break;
			default:
				lastUsedText = `${diffSeconds} секунд`;
		}

		const answerRow = document.createElement('tr');
		table.appendChild(answerRow);
		answerRow.style.cursor = 'pointer';
		answerRow.style.backgroundColor = percentColor;
		answerRow.style.transition = '0.25s';

		answerRow.addEventListener('mouseover', () => {
			answerRow.style.backgroundColor = percentColor.replace('0.6', '0.9');
		});

		answerRow.addEventListener('mouseout', () => {
			answerRow.style.backgroundColor = percentColor;
		});

		const percentData = document.createElement('td');
		answerRow.appendChild(percentData);
		percentData.innerText = answerData._avg.percent.toString();
		applyThTdStyleUtil(percentData);

		const usageData = document.createElement('td');
		applyThTdStyleUtil(usageData);
		usageData.textContent = answerData._count.answers.toString();
		answerRow.appendChild(usageData);

		const lastUsageData = document.createElement('td');
		answerRow.appendChild(lastUsageData);
		lastUsageData.textContent = lastUsedText;
		applyThTdStyleUtil(lastUsageData);

		answerRow.onclick = function () {
			console.log(`Выбран ответ №${index + 1} =>`, answerData.answers);

			items.forEach((item, index) => {
				if (item instanceof HTMLInputElement) {
					if (item.type === 'radio' || item.type === 'checkbox') {
						if (answerData.answers.includes(index.toString())) {
							if (!item.checked) item.click();
						} else if (item.checked) {
							item.click();
						}
					}

					if (item.type === 'text') {
						item.value = answerData.answers[index];
					}
				}

				if (item instanceof HTMLSelectElement) {
					Array.from(item.options).sort((a, b) => {
						return htmlFormatterUtil(a).localeCompare(htmlFormatterUtil(b));
					})[parseInt(answerData.answers[index])].selected = true;
				}

				if (item instanceof HTMLDivElement && item.role === 'textbox') {
					item.innerHTML = answerData.answers[index];
				}
			});
		};
	});
}
