import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GistInfoComponent } from './components/gist/gist-info/gist-info.component';
import { GistsGridComponent } from './components/gist/gists-grid/gists-grid.component';

import { FilterPopoverComponent } from './components/filter-popover/filter-popover.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { UtilService } from './services/util/util.service';

@NgModule({

	declarations: [

		GistInfoComponent,
		GistsGridComponent,
		FilterPopoverComponent,
		SearchBarComponent

	], imports: [

		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
		RouterModule

	], exports: [

		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule,
		GistInfoComponent,
		GistsGridComponent,
		FilterPopoverComponent,
		SearchBarComponent

	], providers: [

		UtilService

	]

}) export class SharedModule {}