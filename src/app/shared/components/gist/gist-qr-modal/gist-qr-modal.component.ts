import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SessionEventService } from '@shared/services/session-event/session-event.service';
import { SessionEntity } from '@models/session-entity.model';

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

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') public readonly isNativePlatform: boolean,
		private modalCtrl: ModalController,
		private sessionEventService: SessionEventService

	) {}

	public ngOnInit(): void {}

	public handleScan(sessionId: string): void {

		const source: SessionEntity = {

			id: sessionId,
			gistIds: [ this.gistId ]

		};

		this.sessionEventService.emitSessionSource(source);

	}

	public dismiss(): void {

		this.modalCtrl.dismiss();

	}

}