import { Component, OnInit, Input } from '@angular/core';
import { BestPractice } from '@entities/best-practice.entity';
import { BestPracticeGroup } from '@models/best-practice-group.model';
import { PracticeGroupingService } from '@shared/services/practice-grouping/practice-grouping.service';

@Component({

	selector: 'app-best-practices-view',
	templateUrl: './best-practices-view.component.html',
	styleUrls: ['./best-practices-view.component.scss'],
	standalone:false

}) export class BestPracticesViewComponent implements OnInit {

	@Input() public practices: Array<BestPractice> = [];

	public groupedSections: Array<BestPracticeGroup> = [];
	public selectedIds = new Set<string>();

	public constructor(private practiceGroupingService: PracticeGroupingService) {}

	public ngOnInit(): void {
		this.groupedSections = this.practiceGroupingService.groupByCategory(this.practices);
		console.log(this.groupedSections);
	}

	public toggleOption(id: string): void {
		// selección/deselección para editar/eliminar
	}

	public onViewGist(practice: BestPractice): void {
		// lógica para abrir vista previa (opcional)
	}

	public addPractice(): void {
		// abrir modal de creación (futuro)
	}

	public editPractice(): void {
		// obtener selectedIds y editar el primero (futuro)
	}

	public deletePractice(): void {
		// confirmar y eliminar (futuro)
	}

}