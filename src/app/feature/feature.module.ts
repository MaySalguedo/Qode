import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './components/header/header.component';
import { SideBarMenuComponent } from './components/side-bar/side-bar-menu/side-bar-menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ToastConfirmationComponent } from './components/toast/toast-confirmation/toast-confirmation.component';

import { LoadingService } from './services/loading/loading.service';
import { HeaderService } from './services/header/header.service';
import { ToastService } from './services/toast/toast.service';

@NgModule({

	declarations: [

		HeaderComponent,
		SideBarMenuComponent,
		LoadingComponent,
		ToastConfirmationComponent

	], imports: [

		CommonModule,
		IonicModule.forRoot()
		

	], exports: [

		HeaderComponent,
		LoadingComponent,
		ToastConfirmationComponent
		//IonicModule

	], providers: [

		LoadingService,
		HeaderService,
		ToastService

	]

}) export class FeatureModule {}