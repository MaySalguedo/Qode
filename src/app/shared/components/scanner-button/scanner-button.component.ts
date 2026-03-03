import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { SwalService } from '@swal/swal.service';

@Component({

	selector: 'app-scanner-button',
	templateUrl: './scanner-button.component.html',
	styleUrls: ['./scanner-button.component.scss'],
	standalone: false

}) export class ScannerButtonComponent implements OnInit {

	@Output() public scannedContent = new EventEmitter<string>();
	public isInstalled: boolean = false;

	public constructor(

		private swalService: SwalService

	) {}

	public async ngOnInit(): Promise<void> {

		try{

			const granted = await this.requestPermissions();
			const isInstalled = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
			await BarcodeScanner.installGoogleBarcodeScannerModule();
			this.isInstalled = true;
		
		}catch(e: any) {

			this.isInstalled = false;
			this.swalService.showException('Scanner Exception', e.message);

		}

	}

	public async startScan() {

		try{

			//const granted = await this.requestPermissions();
			//if (!granted) return;

			const { barcodes } = await BarcodeScanner.scan();

			if (barcodes.length > 0) {

				this.scannedContent.emit(barcodes[0].displayValue);

			}

		}catch(e: any) {

			this.swalService.showException('Scanner Exception', e.message);

		}

	}

	async requestPermissions(): Promise<boolean> {

		const { camera } = await BarcodeScanner.requestPermissions();
		return camera === 'granted' || camera === 'limited';

	}

}