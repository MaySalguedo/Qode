import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Component({

	selector: 'app-scanner-button',
	templateUrl: './scanner-button.component.html',
	styleUrls: ['./scanner-button.component.scss'],
	standalone: false

}) export class ScannerButtonComponent implements OnInit {

	@Output() public scannedContent = new EventEmitter<string>();

	public constructor() {}

	public ngOnInit(): void {}

	async startScan() {

		const granted = await this.requestPermissions();
		if (!granted) return;

		const { barcodes } = await BarcodeScanner.scan();
		
		if (barcodes.length > 0) {

			this.scannedContent.emit(barcodes[0].displayValue);

		}

	}

	async requestPermissions(): Promise<boolean> {

		const { camera } = await BarcodeScanner.requestPermissions();
		return camera === 'granted' || camera === 'limited';

	}

}