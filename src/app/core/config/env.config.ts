import { initializeApp } from '@angular/fire/app';
import { FirebaseApp } from 'firebase/app';
import { Auth, indexedDBLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { initializeAuth } from '@angular/fire/auth';
import { environment as env } from '@env/environment';

export const FireApp: FirebaseApp = initializeApp(env.firebaseConfig);

export function authFactory(app: FirebaseApp, isNativePlatform: boolean): Auth {

	const auth = getAuth(app);

	if (isNativePlatform) {

		setPersistence(auth, indexedDBLocalPersistence);

	}

	return auth;

}