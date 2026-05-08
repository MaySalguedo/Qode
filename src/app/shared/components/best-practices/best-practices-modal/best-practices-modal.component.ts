import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GistQrModalComponent } from '@components/gist/gist-qr-modal/gist-qr-modal.component';
import { PracticeGroupingService } from '@shared/services/practice-grouping/practice-grouping.service';
import { GithubService } from '@github/github.service';
import { Gist } from '@entities/gist.entity';
import { GistFile } from '@models/gist-file.model';
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

	public groupedSections: Array<BestPracticeGroup> = [];
	public selectedIds = new Set<string>();

	public constructor(
		private modalController: ModalController,
		private practiceGroupingService: PracticeGroupingService,
		private githubService: GithubService
	) {}

	public async ngOnInit(): Promise<void> {
		this.groupedSections = this.practiceGroupingService.groupByCategory(this.practices);
	}

	public async onViewPracticeGist(practice: BestPractice): Promise<void> {
		if (!practice.gist) return;

		try {

			const gist = await this.githubService.getGist(practice.gist);

			const readmeFile = Object.values(gist.files).find(
				(f: GistFile) => f.filename.toLowerCase().includes('readme') && f.language === 'Markdown'
			);

			let readmeContent = readmeFile?.content;
			if (readmeFile && !readmeContent) {
				readmeContent = await this.githubService.getGistRawFileContent(readmeFile);
			}

			const modal = await this.modalController.create({

				component: GistQrModalComponent,
				componentProps: {
					gistId: gist.id,
					gistUrl: gist.html_url,
					gistTitle: gist.description,
					readmeContent: readmeContent,
					practices: [],
					previewOnly: true
				},
				breakpoints: [0, 0.75, 1],
				initialBreakpoint: 0.75,
				cssClass: 'gist-preview-modal'

			});
			await modal.present();

		} catch (error) {
			console.error('Error loading practice gist:', error);
		}
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