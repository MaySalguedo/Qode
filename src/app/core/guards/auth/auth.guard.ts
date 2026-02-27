import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { TokenService } from '@token/token.service';

@Injectable({
	
	providedIn: 'root'

}) export class AuthGuard implements CanActivate {

	public constructor(

		private tokenService: TokenService,
		private router: Router

	) {}

	public async canActivate(): Promise<boolean> {

		const access: string | null = this.tokenService.getAccess();

		if (access) return true

		this.router.navigate(['/login']);
		return false;

	}

}