import { Injectable } from '@angular/core';
import { BestPractice } from '@entities/best-practice.entity';
import { BestPracticeGroup } from '@models/best-practice-group.model';

@Injectable({

	providedIn: 'root',

}) export class PracticeGroupingService {

	public groupByCategory(practices: Array<BestPractice>): Array<BestPracticeGroup> {
		const categories = [...new Set(practices.map(p => p.category))].sort();

		return categories.map(cat => {
			const catItems = practices.filter(p => p.category === cat);
			const subCats = [...new Set(catItems.map(p => p.sub_category || 'General'))].sort();

			return {
				category: cat.replace('_', ' '),
				subGroups: subCats.map(sub => ({
					name: sub,
					items: catItems
						.filter(p => (p.sub_category || 'General') === sub)
						.sort((a, b) => a.name.localeCompare(b.name))
				}))
			};
		});
	}
 
}