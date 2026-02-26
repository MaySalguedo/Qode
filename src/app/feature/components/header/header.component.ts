import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderService } from '@feature/services/header/header.service';
import { Observable } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { GitUser } from '@entities/git-user.entity';

@Component({

	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	standalone: false

}) export class HeaderComponent implements OnInit, OnDestroy {

	@Input() public showBackButton: boolean = false;
	@Input() public user!: GitUser;

	public isExpanded: boolean = false;
	public isMenuOpen: boolean = false;

	public isShown$: Observable<boolean> = this.headerService.isShown$;
	public title: string = 'Page';

	public constructor(

		private router: Router,
		private location: Location,
		private authService: AuthService,
		private tokenService: TokenService,
		private headerService: HeaderService

	) {}

	public ngOnInit(): void {

		this.isShown$.subscribe({

			next: (t) => {

				this.title = this.headerService.pageMessage;

			}, error: (e) => console.log(e)

		});

	}

	public ngOnDestroy(): void {}

	public toggleHeader(): void {

		this.isExpanded = !this.isExpanded;

	}

	public toggleMenu(): void {

		this.isMenuOpen = !this.isMenuOpen;

	}

	public async openMenu() {

		this.isMenuOpen = true;

	}

	public async closeMenu() {

		this.isMenuOpen = false;

	}

	public async logout(): Promise<void> {

		this.headerService.hide();
		this.tokenService.removeAccess();
		this.router.navigate(['/login']);

	}

	public async login(): Promise<void> {

		this.router.navigate(['/login']);

	}

	public goBack(): void{

		this.location.back();

	}

}