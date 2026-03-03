import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard'

@Component({

	selector: 'app-device-code-modal',
	templateUrl: './device-code-modal.component.html',
	styleUrls: ['./device-code-modal.component.scss'],
	standalone: false

}) export class DeviceCodeModalComponent implements OnInit {

	@Input() public userCode!: string;
	@Input() public verificationUri!: string;

	public constructor(

		private modalCtrl: ModalController,
		private toastCtrl: ToastController

	) {}

	public ngOnInit(): void {}

	public async copyCode(): Promise<void> {

		await Clipboard.write({ string: this.userCode });
		const toast = await this.toastCtrl.create({
			message: 'Code copied to clipboard',
			duration: 2000,
			position: 'bottom'
		});

		toast.present();

	}

	public async openGitHub(): Promise<void> {
		await Browser.open({ url: this.verificationUri });
	}

	public dismiss(): void {
		this.modalCtrl.dismiss();
	}

}