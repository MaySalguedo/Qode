import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { TokenService } from '@token/token.service';
import { SwalService } from '@swal/swal.service';

@Injectable({

	providedIn: 'root'

}) export class AuthInterceptor implements HttpInterceptor {
	
	public constructor(

		private tokenService: TokenService,
		private swalService: SwalService

	) {}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

		const token = this.tokenService.getAccess();

		const isGitHubRequest = request.url.includes('api.github.com');

		if (token && isGitHubRequest) {

			request = request.clone({

				setHeaders: {

					Authorization: `Bearer ${token}`,
					Accept: 'application/vnd.github+json',
					'X-GitHub-Api-Version': '2022-11-28'

				}

			});

		}

		return next.handle(request).pipe(

			catchError((error: HttpErrorResponse) => {

				if (error.status !== 401 && localStorage.getItem('access_token')) this.swalService.showException('Github Exception', error.message);

				if (error.status === 401) {

					this.tokenService.removeAccess();

				}

				return throwError(() => error);

			})

		);

	}

}