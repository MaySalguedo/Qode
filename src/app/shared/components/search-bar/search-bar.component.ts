import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterPopoverComponent } from '@components/filter-popover/filter-popover.component';

import { FilterField, SortField, FilterState, FilterParams } from '@models/filter.model';

@Component({

	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: false

}) export class SearchBarComponent implements OnInit {

	@Input() public config: FilterParams = {};

	@Input() public initialState: FilterState = {

		searchText: '',
		filters: {},
		sort: null

	};

	@Output() public filterChange = new EventEmitter<FilterState>();

	public currentState: FilterState;

	public constructor(private popoverController: PopoverController) {

		this.currentState = { ...this.initialState };

	}

	public ngOnInit(): void {

		if (this.config.filterFields) {

			this.config.filterFields.forEach(field => {

				if (this.currentState.filters[field.key] === undefined) {

					this.currentState.filters[field.key] = field.type === 'select' && field.options ? field.options[0]?.value : null;

				}

			});

			if (!this.currentState.sort) {
				this.currentState.sort = { field: null, direction: 'asc' };
			}

		}

	}

	public async openFilterPopover(event: Event) {

		const popover = await this.popoverController.create({

			component: FilterPopoverComponent,
			event: event,
			componentProps: {
				config: this.config,
				currentState: this.currentState
			},
			translucent: true,
			showBackdrop: false

		});

		popover.onDidDismiss().then((result) => {

			if (result.data) {

				this.currentState = result.data;
				this.filterChange.emit(this.currentState);

			}

		});

		await popover.present();

	}

	public onSearchChange(event: any) {

		this.currentState.searchText = event.detail.value;
		this.filterChange.emit(this.currentState);

	}

	public clearSearch() {

		this.currentState.searchText = '';
		this.filterChange.emit(this.currentState);

	}

}