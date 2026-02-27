import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({

	selector: 'app-gist-qr-modal',
	templateUrl: './gist-qr-modal.component.html',
	styleUrls: ['./gist-qr-modal.component.scss'],
	standalone: false

}) export class GistQrModalComponent implements OnInit {

	@Input() public gistUrl!: string;
	@Input() public gistTitle!: string;
	@Input() public readmeContent!: string;

	public constructor(private modalCtrl: ModalController) {}

	public ngOnInit(): void {}

	public dismiss() {
		this.modalCtrl.dismiss();
	}

}