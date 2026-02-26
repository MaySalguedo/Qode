import { Component, OnInit,Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { FilterField, SortField, FilterState } from '@models/filter.model';

@Component({

	selector: 'app-filter-popover',
	templateUrl: './filter-popover.component.html',
	styleUrls: ['./filter-popover.component.scss'],
	standalone: false

}) export class FilterPopoverComponent implements OnInit {

	@Input() public config: {

		filterFields?: Array<FilterField>; sortFields?: Array<SortField>

	} = {};
	@Input() public currentState!: FilterState;

	public tempState!: FilterState;

	public constructor(private popoverCtrl: PopoverController) {}

	public ngOnInit(): void {

		this.tempState = JSON.parse(JSON.stringify(this.currentState));

		if (!this.tempState.sort) {
			this.tempState.sort = { field: null, direction: 'asc' };
		}

	}

	public applyFilters(): void {

		this.popoverCtrl.dismiss(this.tempState);

	}

	public clearFilters() {

		const cleared: FilterState = {

			searchText: this.tempState.searchText,
			filters: {},
			sort: { field: null, direction: 'asc' }

		};

		if (this.config.filterFields) {

			this.config.filterFields.forEach(field => {

				if (field.type === 'select' && field.options && field.options.length > 0) {

					cleared.filters[field.key] = field.options[0].value;

				}else{

					cleared.filters[field.key] = null;

				}

			});

		}

		this.tempState = cleared;
		this.popoverCtrl.dismiss(this.tempState);

	}

}