import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '@token/token.service';
import { AuthService } from '@auth/auth.service';

import { SwalService } from '@swal/swal.service';

@Component({

	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	standalone: false

}) export class LoginPage implements OnInit {

	public isLoading: boolean = false;

	public constructor(

		private authService: AuthService,
		private tokenService: TokenService,
		private swalService: SwalService,
		private router: Router

	) {

		if (localStorage.getItem('access_token')) this.router.navigate(['/home']);

	}

	public ngOnInit(): void {}

	public async onLogin(): Promise<void> {

		this.isLoading = true;

		try {

			const credential = await this.authService.login();
			
			if (credential?.accessToken) {

				console.log(credential);

				this.tokenService.setAccess(credential.accessToken);
				this.router.navigate(['/home']);

			}

		} catch (e: any) {

			this.swalService.showException('Login Exception', e.message);

		} finally {

			this.isLoading = false;

		}

	}

}