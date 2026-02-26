
export interface FilterField {

	key: string;
	label: string;
	type: 'text' | 'select' | 'boolean' | 'date';
	options?: Array<{ value: any; label: string }>;

}

export interface SortField {

	key: string;
	label: string;

}

export interface FilterState {

	searchText: string;
	filters: { [key: string]: any };
	sort: { field: string | null; direction: 'asc' | 'desc' } | null;

}

export interface FilterParams {

	searchPlaceholder?: string;
	filterFields?: FilterField[];
	sortFields?: SortField[];

}