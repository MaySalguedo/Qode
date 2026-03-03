import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '@token/token.service';
import { AuthService } from '@auth/auth.service';

import { SwalService } from '@swal/swal.service';

import { ModalController } from '@ionic/angular';
import { DeviceCodeModalComponent } from '@components/device-code-modal/device-code-modal.component';

@Component({

	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	standalone: false

}) export class LoginPage implements OnInit {

	public isLoading: boolean = false;

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') private isNativePlatform: boolean,
		private authService: AuthService,
		private tokenService: TokenService,
		private swalService: SwalService,
		private router: Router,
		private modalController: ModalController

	) {

		if (localStorage.getItem('access_token')) this.router.navigate(['/home']);

	}

	public ngOnInit(): void {}

	public async onLogin(): Promise<void> {

		this.isLoading = true;

		try {

			if (this.isNativePlatform){

				await this.loginOnNative();

			} else {

				await this.loginOnBrowser();

			}

		} catch (e: any) {

			this.swalService.showException('Login Exception', e.message);

		} finally {

			this.isLoading = false;

		}

	}

	public async loginOnNative(): Promise<void> {

		const deviceData = await this.authService.requestDeviceCode();

		const modal = await this.modalController.create({
			component: DeviceCodeModalComponent,
			componentProps: {
			userCode: deviceData.user_code,
			verificationUri: deviceData.verification_uri
		},
			backdropDismiss: false
		});

		await modal.present();

		let tokenData = null;
		let isAuthorized = false;
		const intervalMs = 10 * 1000;

		try {
			while (!isAuthorized) {

				tokenData = await this.authService.pollForToken(deviceData.device_code);
				
				if (tokenData && tokenData.access_token) {
					isAuthorized = true;
				} else if (tokenData?.error === 'authorization_pending') {

					await new Promise(resolve => setTimeout(resolve, intervalMs));
				} else {

					throw new Error(tokenData?.error || 'Unknown error');
				}
			}

			await modal.dismiss();

			if (tokenData && tokenData.access_token) {
				const result = await this.authService.signInWithGithubToken(tokenData.access_token);
				if (result.user) {
					this.tokenService.setAccess(tokenData.access_token);
					this.router.navigate(['/home']);
				}
			}

		} catch (error: any) {
			//await modal.dismiss();
			this.swalService.showException('Error de autenticación', error.message);
		}

	}

	public async loginOnBrowser(): Promise<void> {

		const credential = await this.authService.login();
	
		if (credential?.accessToken) {

			console.log(credential);

			this.tokenService.setAccess(credential.accessToken);
			this.router.navigate(['/home']);

		}

	}

}