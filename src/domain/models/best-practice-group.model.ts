import { BestPractice } from '@entities/best-practice.entity';

export interface BestPracticeGroup {

	category: string;
	subGroups: {
		name: string;
		items: Array<BestPractice>;
	}[];

}