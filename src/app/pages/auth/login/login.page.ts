import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '@token/token.service';
import { AuthService } from '@auth/auth.service';

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

		} catch (error) {

			console.error('Login failed', error);

		} finally {

			this.isLoading = false;

		}

	}

}