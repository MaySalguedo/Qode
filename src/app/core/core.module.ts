import { NgModule, Optional, SkipSelf } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FireApp, authFactory } from './config/env.config';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { environment as env } from '@env/environment';

import { TokenService } from './services/storage/token/token.service';
import { SwalService } from './services/swal/swal.service';

import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { GithubService } from './services/http/github/github.service';

import { Capacitor } from '@capacitor/core';

@NgModule({

	declarations: [

		

	], imports: [

		

	], providers: [

		provideHttpClient(withInterceptorsFromDi()),
		provideFirebaseApp(() => FireApp),
		provideAuth(() => authFactory(FireApp, Capacitor.isNativePlatform())),
		TokenService, SwalService, GithubService,
		{

			provide: 'GITHUB_API_URL',
			useValue: env.github_api_url

		}, {

			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true

		}, {

			provide: 'IS_NATIVE_PLATFORM',
			useValue: Capacitor.isNativePlatform()

		}

	]
})
export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {

		if (parentModule) {

			throw new Error('CoreModule is already loaded. Import it in the AppModule only.');

		}

	}
}