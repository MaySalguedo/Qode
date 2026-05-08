import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QRCodeComponent } from 'angularx-qrcode';
import { MarkdownModule } from 'ngx-markdown';

import { BestPracticesModalComponent } from './components/best-practices/best-practices-modal/best-practices-modal.component';
import { BestPracticesItemsComponent } from './components/best-practices/best-practices-items/best-practices-items.component';
import { BestPracticesViewComponent } from './components/best-practices/best-practices-view/best-practices-view.component';

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
import { PracticeGroupingService } from './services/practice-grouping/practice-grouping.service';

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
		ScannerButtonComponent,
		BestPracticesModalComponent,
		BestPracticesItemsComponent,
		BestPracticesViewComponent

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
		ScannerButtonComponent,
		BestPracticesModalComponent,
		BestPracticesItemsComponent,
		BestPracticesViewComponent

	], providers: [

		UtilService, SessionEventService, PracticeGroupingService, {

			provide: 'IS_NATIVE_PLATFORM',
			useValue: Capacitor.isNativePlatform()

		}

	]

}) export class SharedModule {}