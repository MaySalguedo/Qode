import { Injectable } from '@angular/core';

@Injectable({

	providedIn: 'root',

}) export class UtilService {

	private readonly defaultColor: string = '#ccc';

	private readonly languages: { [key: string]: string } = {

		'JavaScript': '#f1e05a',
		'TypeScript': '#2b7489',
		'Python': '#3572A5',
		'Java': '#b07219',
		'C++': '#f34b7d',
		'C#': '#178600',
		'PHP': '#4F5D95',
		'Ruby': '#701516',
		'CSS': '#563d7c',
		'HTML': '#e34c26',
		'Batchfile': '#89e051',
		'PLpgSQL': '#336791'

	};

	private readonly techs: { [key: string]: string } = {

		'Vue': '#2c3e50',
		'React': '#61dafb',
		'Angular': '#dd0031'

	};

	public constructor() {}

	public getLanguageColor(language: string): string {

		return this.languages[language] || this.defaultColor;

	}

	public getTechColor(tech: string): string {

		return this.techs[tech] || this.defaultColor;

	}

	public formatDate(dateString: string): string {

		const date = new Date(dateString);

		return date.toLocaleDateString('es-ES', {

			year: 'numeric',
			month: 'short',
			day: 'numeric'

		});

	}

}