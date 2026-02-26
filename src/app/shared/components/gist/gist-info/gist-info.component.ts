import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Gist } from '@entities/gist.entity';
import { UtilService } from '@util/util.service';

@Component({
	selector: 'app-gist-info',
	templateUrl: './gist-info.component.html',
	styleUrls: ['./gist-info.component.scss'],
	standalone: false
})
export class GistInfoComponent implements OnInit {
	@Input({ required: true }) public gist!: Gist;
	@Input() public user_id!: number;
	@Output() public gistSelected = new EventEmitter<Gist>();

	public isOwner: boolean = false;
	public fileList: any[] = [];
	public mainLanguage: string = 'Text';
	public createdAt: string = '';
	public updatedAt: string = '';

	constructor(public readonly utilService: UtilService) {}

	ngOnInit(): void {
		this.isOwner = this.user_id === this.gist.owner.id;
		
		// Convertimos el objeto de archivos en un array para iterar más fácil
		const files = Object.values(this.gist.files);
		this.fileList = files;

		if (files.length > 0) {
			this.mainLanguage = files[0].language || 'Text';
		}

		const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
		this.createdAt = new Date(this.gist.created_at).toLocaleDateString(undefined, options);
		this.updatedAt = new Date(this.gist.updated_at).toLocaleDateString(undefined, options);

	}

}