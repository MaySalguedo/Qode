import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BestPracticeService } from '@core/services/firebase/practice/best-practice.service';
import { BestPractice } from '@entities/best-practice.entity';
import { BestPracticeGroup } from '@models/best-practice-group.model';

@Component({

	selector: 'app-best-practices-modal',
	templateUrl: './best-practices-modal.component.html',
	styleUrls: ['./best-practices-modal.component.scss'],
	standalone: false

}) export class BestPracticesModalComponent implements OnInit {

	@Input() public contextName: string = '';	
	@Input() public practices: Array<BestPractice> = [];

	public groupedSections: BestPracticeGroup[] = [];
	public selectedIds = new Set<string>();

	public constructor(
		private modalController: ModalController,
		private bestPracticeService: BestPracticeService
	) {}

	public async ngOnInit(): Promise<void> {
		//await this.loadPractices();
		this.organizeData();
	}

	private async loadPractices(): Promise<void> {
		this.practices = await this.bestPracticeService.findAll();
	}

	private organizeData(): void {
		const categories = [...new Set(this.practices.map(p => p.category))].sort();
		
		this.groupedSections = categories.map(cat => {
			const catItems = this.practices.filter(p => p.category === cat);
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

	get selectedCount(): number {
		return this.selectedIds.size;
	}

	get hasSelection(): boolean {
		return this.selectedIds.size > 0;
	}

	public toggleOption(id: NonNullable<BestPractice['id']>): void {
		if (this.selectedIds.has(id)) {
			this.selectedIds.delete(id);
		} else {
			this.selectedIds.add(id);
		}
	}

	public selectAll(): void {
		this.practices.forEach(p => this.selectedIds.add(p.id as string));
	}

	public clearAll(): void {
		this.selectedIds.clear();
	}

	public confirm(): void {
		this.modalController.dismiss(Array.from(this.selectedIds), 'Confirm');
	}

	public cancel(): void {
		this.modalController.dismiss(null, 'Cancel');
	}
}