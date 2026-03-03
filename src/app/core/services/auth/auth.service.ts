import { Injectable, Inject } from '@angular/core';
//import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { 
	Auth, 
	signInWithPopup, 
	GithubAuthProvider,
	signInWithCredential,
	signInWithRedirect,
	getRedirectResult,
	signOut, 
	user, 
	User,
	authState,
	OAuthCredential
} from '@angular/fire/auth';
import { Observable, from, firstValueFrom, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DeviceCodeResponse } from '@models/divice-code-response.model';
import { GitTokenResponse } from '@models/git-token-response.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user$: Observable<User | null>;

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') private isNativePlatform: boolean,
		@Inject('GITHUB_APP_CLIENT_ID') private CLIENT_ID: string,
		private auth: Auth,
		//private readonly http: HttpClient

	) {

		this.user$ = authState(this.auth);

	}

	public async login(): Promise<OAuthCredential | null> {

		const provider = new GithubAuthProvider();

		provider.addScope('read:user');
		provider.addScope('gist');

		if (this.isNativePlatform) {

			await signInWithRedirect(this.auth, provider);

			return null;

		}else{

			const result = await signInWithPopup(this.auth, provider);

			return GithubAuthProvider.credentialFromResult(result);

		}

	}

	public async handleRedirectResult(): Promise<OAuthCredential | null> {

		if (this.isNativePlatform) {

			const result = await getRedirectResult(this.auth);

			if (result) {

				return GithubAuthProvider.credentialFromResult(result);

			}

		}

		return null;

	}

	public async logout(): Promise<void> {

		try {

			await signOut(this.auth);
			localStorage.removeItem('gh_access_token');

		} catch (error) {

			console.error('Error signing out:', error);

		}

	}

	public async requestDeviceCode(): Promise<DeviceCodeResponse> {

		const options = {
			url: 'https://github.com/login/device/code',
			headers: { 
				'Accept': 'application/json',
				'Content-Type': 'application/json' 
			},
			data: {
				client_id: this.CLIENT_ID,
				scope: 'read:user gist'
			}
		};

		const response: HttpResponse = await CapacitorHttp.post(options);
		return response.data;

		/*const url = 'https://github.com/login/device/code';
		const body = {

			client_id: this.CLIENT_ID,
			scope: 'read:user gist'

		};

		const headers = new HttpHeaders({ 'Accept': 'application/json' });

		return firstValueFrom(this.http.post<DeviceCodeResponse>(url, body, { headers }));*/

	}

	public async pollForToken(deviceCode: string): Promise<GitTokenResponse> {

		const options = {
			url: 'https://github.com/login/oauth/access_token',
			headers: {

				'Accept': 'application/json',
				'Content-Type': 'application/json'

			}, data: {
				client_id: this.CLIENT_ID,
				device_code: deviceCode,
				grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
			}
		};

		const response: HttpResponse = await CapacitorHttp.post(options);
		const data = response.data;

		if (data.error) {

			if (data.error === 'authorization_pending') {
				return data; 
			}

			throw new Error(data.error_description || data.error);

		}

		return data;

		/*const url = 'https://github.com/login/oauth/access_token';
		const body = {

			client_id: this.CLIENT_ID,
			device_code: deviceCode,
			grant_type: 'urn:ietf:params:oauth:grant-type:device_code'

		};

		const headers = new HttpHeaders({ 'Accept': 'application/json' });

		return await firstValueFrom(this.http.post<GitTokenResponse>(url, body, { headers }));*/

	}

	public async signInWithGithubToken(token: string) {

		const credential = GithubAuthProvider.credential(token);
		return await signInWithCredential(this.auth, credential);

	}

}