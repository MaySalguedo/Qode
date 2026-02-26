import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FilterPopoverComponent } from './filter-popover.component';
import { FilterState, FilterField } from '@models/filter.model';

describe('FilterPopoverComponent', () => {
	let component: FilterPopoverComponent;
	let fixture: ComponentFixture<FilterPopoverComponent>;
	let popoverCtrlSpy: jasmine.SpyObj<PopoverController>;

	const mockFilterFields: FilterField[] = [
		{ key: 'type', label: 'Type', type: 'select', options: [{ value: 'all', label: 'All' }, { value: 'repo', label: 'Repository' }] },
		{ key: 'language', label: 'Language', type: 'text' },
		{ key: 'archived', label: 'Archived', type: 'boolean' }
	];

	const mockSortFields = [
		{ key: 'name', label: 'Name' },
		{ key: 'date', label: 'Date' }
	];

	const mockCurrentState: FilterState = {
		searchText: 'test',
		filters: { type: 'repo', language: 'TypeScript', archived: false },
		sort: { field: 'name', direction: 'asc' }
	};

	beforeEach(waitForAsync(() => {
		popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['dismiss']);

		TestBed.configureTestingModule({
			declarations: [FilterPopoverComponent],
			imports: [IonicModule.forRoot()],
			providers: [
				{ provide: PopoverController, useValue: popoverCtrlSpy }
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(FilterPopoverComponent);
		component = fixture.componentInstance;
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		it('should clone currentState to tempState', () => {
			component.config = { filterFields: mockFilterFields, sortFields: mockSortFields };
			component.currentState = mockCurrentState;
			component.ngOnInit();

			expect(component.tempState).toEqual(mockCurrentState);
			expect(component.tempState).not.toBe(mockCurrentState); // should be a clone
		});

		it('should initialize sort if null in tempState', () => {
			const stateWithoutSort: FilterState = {
				searchText: 'test',
				filters: {},
				sort: null
			};
			component.currentState = stateWithoutSort;
			component.ngOnInit();

			expect(component.tempState.sort).toEqual({ field: null, direction: 'asc' });
		});

		it('should keep existing sort if not null', () => {
			component.currentState = mockCurrentState;
			component.ngOnInit();

			expect(component.tempState.sort).toEqual(mockCurrentState.sort);
		});
	});

	describe('applyFilters', () => {
		it('should dismiss popover with tempState', () => {
			component.tempState = mockCurrentState;
			component.applyFilters();

			expect(popoverCtrlSpy.dismiss).toHaveBeenCalledWith(mockCurrentState);
		});
	});

	describe('clearFilters', () => {
		it('should reset filters based on config.filterFields and dismiss', () => {
			component.config = { filterFields: mockFilterFields, sortFields: mockSortFields };
			component.tempState = { ...mockCurrentState, searchText: 'keep' };
			component.clearFilters();

			const expectedCleared: FilterState = {
				searchText: 'keep',
				filters: {
					type: 'all',			// primer option del select
					language: null,
					archived: null
				},
				sort: { field: null, direction: 'asc' }
			};

			expect(component.tempState).toEqual(expectedCleared);
			expect(popoverCtrlSpy.dismiss).toHaveBeenCalledWith(expectedCleared);
		});

		it('should handle missing filterFields', () => {
			component.config = {};
			component.tempState = { searchText: 'keep', filters: { something: 'value' }, sort: { field: 'name', direction: 'asc' } };
			component.clearFilters();

			const expected: FilterState = {
				searchText: 'keep',
				filters: {},
				sort: { field: null, direction: 'asc' }
			};

			expect(component.tempState).toEqual(expected);
			expect(popoverCtrlSpy.dismiss).toHaveBeenCalledWith(expected);
		});

		it('should handle filterFields with no options for select', () => {
			const fields: FilterField[] = [
				{ key: 'type', label: 'Type', type: 'select', options: [] } // empty options
			];
			component.config = { filterFields: fields };
			component.tempState = { searchText: '', filters: { type: 'old' }, sort: null };
			component.clearFilters();

			const expected: FilterState = {
				searchText: '',
				filters: { type: null }, // null because no options
				sort: { field: null, direction: 'asc' }
			};

			expect(component.tempState).toEqual(expected);
		});

		it('should handle non-select fields correctly', () => {
			const fields: FilterField[] = [
				{ key: 'text', label: 'Text', type: 'text' },
				{ key: 'bool', label: 'Bool', type: 'boolean' },
				{ key: 'date', label: 'Date', type: 'date' }
			];
			component.config = { filterFields: fields };
			component.tempState = { searchText: 'x', filters: { text: 'a', bool: true, date: '2020' }, sort: null };
			component.clearFilters();

			const expected: FilterState = {
				searchText: 'x',
				filters: { text: null, bool: null, date: null },
				sort: { field: null, direction: 'asc' }
			};

			expect(component.tempState).toEqual(expected);
		});
	});
});