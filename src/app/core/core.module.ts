import { NgModule, Optional, SkipSelf } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment as env } from '@env/environment';

import { TokenService } from './services/storage/token/token.service';
import { SwalService } from './services/swal/swal.service';

import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { GithubService } from './services/http/github/github.service';

@NgModule({

	declarations: [],
	imports: [

		

	], providers: [

		provideHttpClient(withInterceptorsFromDi()),
		provideFirebaseApp(() => initializeApp(env.firebaseConfig)),
		provideAuth(() => getAuth()),
		TokenService, SwalService, GithubService,
		{

			provide: 'GITHUB_API_URL',
			useValue: env.github_api_url

		}, {
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
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