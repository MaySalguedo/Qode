import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SearchBarComponent } from './search-bar.component';
import { FilterField, FilterState, FilterParams } from '@models/filter.model';

describe('SearchBarComponent', () => {
	let component: SearchBarComponent;
	let fixture: ComponentFixture<SearchBarComponent>;
	let popoverCtrlSpy: jasmine.SpyObj<PopoverController>;
	let mockPopover: any;

	const mockFilterFields: FilterField[] = [
		{ key: 'type', label: 'Type', type: 'select', options: [{ value: 'all', label: 'All' }, { value: 'repo', label: 'Repository' }] },
		{ key: 'language', label: 'Language', type: 'text' },
		{ key: 'archived', label: 'Archived', type: 'boolean' }
	];

	const mockSortFields = [
		{ key: 'name', label: 'Name' },
		{ key: 'date', label: 'Date' }
	];

	const mockConfig: FilterParams = {
		searchPlaceholder: 'Search...',
		filterFields: mockFilterFields,
		sortFields: mockSortFields
	};

	const mockInitialState: FilterState = {
		searchText: 'initial',
		filters: { type: 'repo', language: 'TypeScript', archived: false },
		sort: { field: 'name', direction: 'asc' }
	};

	beforeEach(async () => {
		mockPopover = {
			present: jasmine.createSpy('present'),
			onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ data: null }))
		};

		popoverCtrlSpy = jasmine.createSpyObj('PopoverController', ['create']);
		popoverCtrlSpy.create.and.returnValue(Promise.resolve(mockPopover));

		await TestBed.configureTestingModule({
			declarations: [SearchBarComponent],
			providers: [
				{ provide: PopoverController, useValue: popoverCtrlSpy }
			],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(SearchBarComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('initialization', () => {
		it('should have default initialState when not provided', () => {
			expect(component.initialState).toEqual({
				searchText: '',
				filters: {},
				sort: null
			});
			expect(component.currentState).toEqual({
				searchText: '',
				filters: {},
				sort: null
			});
		});
	});

	describe('ngOnInit', () => {
		it('should initialize missing filters with default values when filterFields are provided', () => {
			component.config = { filterFields: mockFilterFields };
			component.currentState = {
				searchText: '',
				filters: {},
				sort: null
			};
			component.ngOnInit();

			expect(component.currentState.filters).toEqual({
				type: 'all',
				language: null,
				archived: null
			});
			expect(component.currentState.sort).toEqual({ field: null, direction: 'asc' });
		});

		it('should not override existing filter values', () => {
			component.config = { filterFields: mockFilterFields };
			component.currentState = {
				searchText: 'test',
				filters: { type: 'repo', language: 'JavaScript' },
				sort: { field: 'name', direction: 'desc' }
			};
			component.ngOnInit();

			expect(component.currentState.filters).toEqual({
				type: 'repo',
				language: 'JavaScript',
				archived: null
			});
			expect(component.currentState.sort).toEqual({ field: 'name', direction: 'desc' });
		});

		it('should set sort to default if null and filterFields exist', () => {
			component.config = { filterFields: mockFilterFields };
			component.currentState = {
				searchText: '',
				filters: {},
				sort: null
			};
			component.ngOnInit();
			expect(component.currentState.sort).toEqual({ field: null, direction: 'asc' });
		});

		it('should not modify anything if no filterFields', () => {
			component.config = {};
			component.currentState = { searchText: 'test', filters: { a: 1 }, sort: null };
			const original = { ...component.currentState };
			component.ngOnInit();
			expect(component.currentState).toEqual(original);
		});
	});

	describe('openFilterPopover', () => {
		it('should create popover with correct configuration', async () => {
			const event = new Event('click');
			component.config = mockConfig;
			component.currentState = mockInitialState;

			await component.openFilterPopover(event);

			expect(popoverCtrlSpy.create).toHaveBeenCalledWith({
				component: jasmine.any(Function),
				event: event,
				componentProps: {
					config: mockConfig,
					currentState: mockInitialState
				},
				translucent: true,
				showBackdrop: false
			});
			expect(mockPopover.present).toHaveBeenCalled();
		});

		it('should update currentState and emit filterChange when popover returns data', async () => {
			const newState: FilterState = {
				searchText: 'new',
				filters: { type: 'all' },
				sort: { field: 'date', direction: 'desc' }
			};
			mockPopover.onDidDismiss.and.returnValue(Promise.resolve({ data: newState }));
			const emitSpy = spyOn(component.filterChange, 'emit');

			component.currentState = mockInitialState;
			await component.openFilterPopover(new Event('click'));

			expect(component.currentState).toBe(newState);
			expect(emitSpy).toHaveBeenCalledWith(newState);
		});

		it('should not update if popover returns no data', async () => {
			mockPopover.onDidDismiss.and.returnValue(Promise.resolve({ data: null }));
			const emitSpy = spyOn(component.filterChange, 'emit');
			const originalState = { ...mockInitialState };
			component.currentState = originalState;

			await component.openFilterPopover(new Event('click'));

			expect(component.currentState).toBe(originalState);
			expect(emitSpy).not.toHaveBeenCalled();
		});
	});

	describe('onSearchChange', () => {
		it('should update searchText and emit filterChange', () => {
			const emitSpy = spyOn(component.filterChange, 'emit');
			const event = { detail: { value: 'new search' } };
			component.currentState = { ...mockInitialState };

			component.onSearchChange(event);

			expect(component.currentState.searchText).toBe('new search');
			expect(emitSpy).toHaveBeenCalledWith(component.currentState);
		});
	});

	describe('clearSearch', () => {
		it('should clear searchText and emit filterChange', () => {
			const emitSpy = spyOn(component.filterChange, 'emit');
			component.currentState = { ...mockInitialState, searchText: 'something' };

			component.clearSearch();

			expect(component.currentState.searchText).toBe('');
			expect(emitSpy).toHaveBeenCalledWith(component.currentState);
		});
	});
});