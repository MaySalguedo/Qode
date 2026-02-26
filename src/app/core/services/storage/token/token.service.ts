import { Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Injectable({

	providedIn: 'root'

}) export class TokenService {

	public constructor(private authService: AuthService) {}

	public setAccess(access_token: string): void {

		localStorage.setItem('access_token', access_token);

	}

	public getAccess(): string | null {

		return localStorage.getItem('access_token');

	}

	public removeAccess(): void {

		localStorage.removeItem('access_token');

	}

}