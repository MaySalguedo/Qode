import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QRCodeComponent } from 'angularx-qrcode';
import { MarkdownModule } from 'ngx-markdown';

import { GistInfoComponent } from './components/gist/gist-info/gist-info.component';
import { GistQrModalComponent } from './components/gist/gist-qr-modal/gist-qr-modal.component';
import { GistsGridComponent } from './components/gist/gists-grid/gists-grid.component';

import { DeviceCodeModalComponent } from './components/device-code-modal/device-code-modal.component';
import { FilterPopoverComponent } from './components/filter-popover/filter-popover.component';
import { MarkdownViewerComponent } from './components/markdown-viewer/markdown-viewer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ScannerButtonComponent } from './components/scanner-button/scanner-button.component';

import { UtilService } from './services/util/util.service';
import { SessionEventService } from './services/session-event/session-event.service';

import { Capacitor } from '@capacitor/core';

@NgModule({

	declarations: [

		GistInfoComponent,
		GistQrModalComponent,
		GistsGridComponent,
		DeviceCodeModalComponent,
		FilterPopoverComponent,
		SearchBarComponent,
		MarkdownViewerComponent,
		ScannerButtonComponent

	], imports: [

		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
		RouterModule,
		QRCodeComponent,
		MarkdownModule.forRoot()

	], exports: [

		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule,
		QRCodeComponent,
		MarkdownModule,
		GistInfoComponent,
		GistQrModalComponent,
		GistsGridComponent,
		DeviceCodeModalComponent,
		FilterPopoverComponent,
		MarkdownViewerComponent,
		SearchBarComponent,
		ScannerButtonComponent

	], providers: [

		UtilService, SessionEventService, {

			provide: 'IS_NATIVE_PLATFORM',
			useValue: Capacitor.isNativePlatform()

		}

	]

}) export class SharedModule {}