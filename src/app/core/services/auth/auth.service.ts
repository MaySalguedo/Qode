import { Injectable } from '@angular/core';
import { 
	Auth, 
	signInWithPopup, 
	GithubAuthProvider,
	signInWithCredential,
	signOut, 
	user, 
	User,
	authState,
	OAuthCredential
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
//import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public user$: Observable<User | null>;

	public constructor(private auth: Auth) {

		this.user$ = authState(this.auth);

	}

	/*public async login(): Promise<{ accessToken: string } | null> {//Promise<OAuthCredential | null> {

		const result = await FirebaseAuthentication.signInWithGithub();

		const accessToken = result.credential?.accessToken;

		if (accessToken) {
			// 3. ¡Paso crítico! Sincronizamos la sesión nativa con AngularFire
			// para que authState y Firebase en la web se enteren del inicio de sesión.
			const credential = GithubAuthProvider.credential(accessToken);
			await signInWithCredential(this.auth, credential);

			// 4. Devolvemos el token con la estructura que tu login.page.ts ya espera
			return { accessToken };
		}

		return null;

		/*const provider = new GithubAuthProvider();

		provider.addScope('read:user');
		provider.addScope('gist');

		const result = await signInWithPopup(this.auth, provider);

		return GithubAuthProvider.credentialFromResult(result);

	}*/

	public async login(): Promise<OAuthCredential | null> {

		const provider = new GithubAuthProvider();

		provider.addScope('read:user');
		provider.addScope('gist');

		const result = await signInWithPopup(this.auth, provider);

		return GithubAuthProvider.credentialFromResult(result);

	}

	public async logout(): Promise<void> {

		try {

			//await FirebaseAuthentication.signOut();
			await signOut(this.auth);
			localStorage.removeItem('gh_access_token');

		} catch (error) {

			console.error('Error signing out:', error);

		}

	}

}