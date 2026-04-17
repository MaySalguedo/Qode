import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BestPracticesModalComponent } from '@components/best-practices/best-practices-modal/best-practices-modal.component';
import { SessionEventService } from '@shared/services/session-event/session-event.service';
import { SessionEntity } from '@models/session-entity.model';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { BestPractice } from '@entities/best-practice.entity';

@Component({

	selector: 'app-gist-qr-modal',
	templateUrl: './gist-qr-modal.component.html',
	styleUrls: ['./gist-qr-modal.component.scss'],
	standalone: false

}) export class GistQrModalComponent implements OnInit {

	@Input() public gistId!: string;
	@Input() public gistUrl!: string;
	@Input() public gistTitle!: string;
	@Input() public readmeContent!: string;
	@Input() public practices: Array<BestPractice> = [];

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') public readonly isNativePlatform: boolean,
		private modalController: ModalController,
		private sessionEventService: SessionEventService

	) {}

	public async ngOnInit(): Promise<void> {

		await this.checkBarcodeModule();

	}

	public async checkBarcodeModule(): Promise<void> {

		const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
		
		if (!available) {
			await BarcodeScanner.installGoogleBarcodeScannerModule();
		}

	}

	public async handleScan(sessionId: string): Promise<void> {

		const bestPracticesModal = await this.modalController.create({

			component: BestPracticesModalComponent,
			componentProps: {

				contextName: this.gistTitle,
				practices: this.practices

			}, breakpoints: [0, 0.75, 1],
			initialBreakpoint: 0.75,
			cssClass: 'best-practices-modal',

		});
 
		await bestPracticesModal.present();
 
		const { data, role } = await bestPracticesModal.onWillDismiss<Array<string>>();

		if (role === 'Confirm' && data) {

			const source: SessionEntity = {

				id: sessionId,
				gistIds: [ this.gistId ],
				practicesIds: data

			};

			this.sessionEventService.emitSessionSource(source);

		}

	}

	public dismiss(): void {

		this.modalController.dismiss();

	}

}