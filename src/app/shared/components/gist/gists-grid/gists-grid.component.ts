import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gist } from '@entities/gist.entity';
import { FilterState, FilterParams } from '@models/filter.model';

@Component({

	selector: 'app-gists-grid',
	templateUrl: './gists-grid.component.html',
	styleUrls: ['./gists-grid.component.scss'],
	standalone: false

}) export class GistsGridComponent implements OnInit {

	@Input({ required: true }) public gists: Gist[] = [];
	@Input() public user_id!: number;
	@Output() public gistSelected = new EventEmitter<Gist>();

	public filteredGists: Gist[] = [];
	
	public searchConfig: FilterParams = {

		searchPlaceholder: 'Search Gists...',
		filterFields: [
			{
				key: 'visibility',
				label: 'Visibility',
				type: 'select',
				options: [
					{ value: 'all', label: 'All' },
					{ value: 'public', label: 'Public' },
					{ value: 'secret', label: 'Secret' }
				]
			},
			{
				key: 'language',
				label: 'Language',
				type: 'select',
				options: []
			}
		],
		sortFields: [
			{ key: 'created_at', label: 'Created date' },
			{ key: 'updated_at', label: 'Updated date' },
			{ key: 'comments', label: 'Comments' }
		]
	};

	public ngOnInit(): void {
		this.filteredGists = [...this.gists];
		this.searchConfig.filterFields![1].options = this.getLanguageOptions();
	}

	public onFilterChange(state: FilterState) {
		let filtered = [...this.gists];

		// Text Search (Description or File names)
		if (state.searchText) {
			const term = state.searchText.toLowerCase();
			filtered = filtered.filter(gist => 
				gist.description?.toLowerCase().includes(term) ||
				Object.keys(gist.files).some(name => name.toLowerCase().includes(term))
			);
		}

		// Visibility Filter
		if (state.filters['visibility'] && state.filters['visibility'] !== 'all') {
			const isPublic = state.filters['visibility'] === 'public';
			filtered = filtered.filter(gist => gist.public === isPublic);
		}

		// Language Filter
		if (state.filters['language'] && state.filters['language'] !== 'all') {
			filtered = filtered.filter(gist => 
				Object.values(gist.files).some(f => f.language === state.filters['language'])
			);
		}

		// Sorting
		if (state.sort?.field) {

			const field = state.sort.field as keyof Gist;
			const dir = state.sort.direction === 'asc' ? 1 : -1;

			filtered.sort((a, b) => {
				const valA = a[field];
				const valB = b[field];

				if (valA == null) return 1;
				if (valB == null) return -1;

				return (valA > valB ? 1 : -1) * dir;
			});
		}

		this.filteredGists = filtered;
	}

	private getLanguageOptions() {
		const langs = new Set<string>();
		this.gists.forEach(g => {
			Object.values(g.files).forEach(f => { if(f.language) langs.add(f.language)});
		});
		return [{ value: 'all', label: 'All' }, ...Array.from(langs).map(l => ({ value: l, label: l }))];
	}
}