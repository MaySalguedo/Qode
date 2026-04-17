import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BestPractice } from '@entities/best-practice.entity';
import { BestPracticeGroup } from '@models/best-practice-group.model';

@Component({

	selector: 'app-best-practices-items',
	templateUrl: './best-practices-items.component.html',
	styleUrls: ['./best-practices-items.component.scss'],
	standalone: false

})  export class BestPracticesItemsComponent implements OnInit {

	@Input() public section!: BestPracticeGroup;
	@Input() public selectedIds: Set<string> = new Set<string>();
	
	@Output() public toggleOption = new EventEmitter<NonNullable<BestPractice['id']>>();

	public constructor() {}

	public ngOnInit(): void {}

	public isSelected(id: BestPractice['id']): boolean {
		if (!id) return false;
		return this.selectedIds.has(id);
	}

	public onToggle(id: BestPractice['id']): void {
		if (id) {
			this.toggleOption.emit(id);
		}
	}
}