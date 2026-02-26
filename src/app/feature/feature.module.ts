import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './components/header/header.component';
import { SideBarMenuComponent } from './components/side-bar/side-bar-menu/side-bar-menu.component';
import { LoadingComponent } from './components/loading/loading.component';

import { LoadingService } from './services/loading/loading.service';
import { HeaderService } from './services/header/header.service';

@NgModule({

	declarations: [

		HeaderComponent,
		SideBarMenuComponent,
		LoadingComponent

	], imports: [

		CommonModule,
		IonicModule.forRoot()
		

	], exports: [

		HeaderComponent,
		LoadingComponent
		//IonicModule

	], providers: [

		LoadingService,
		HeaderService

	]

}) export class FeatureModule {}