import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({

	selector: 'app-side-bar-menu',
	templateUrl: './side-bar-menu.component.html',
	styleUrls: ['./side-bar-menu.component.scss'],
	standalone: false

}) export class SideBarMenuComponent implements OnInit {

	@Input() public isLogged: boolean = false;
	@Input() public isOpen: boolean  = false;

	@Output() public onClose = new EventEmitter<void>();
	@Output() public onLogout = new EventEmitter<void>();

	public constructor(

		private router: Router,
		private menuController: MenuController

	) {}

	public ngOnInit(): void {}

	public async navigateTo(url: string) {

		await this.menuController.close('main-menu');
		this.router.navigate([url]);

	}

	public close(): void {

		this.onClose.emit();

	}

	public logout(): void {

		this.onLogout.emit();

	}

}