import { Injectable, Inject } from '@angular/core';
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
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user$: Observable<User | null>;

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') private isNativePlatform: boolean,
		private auth: Auth

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

}