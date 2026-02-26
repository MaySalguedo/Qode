import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { forkJoin, Observable, of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { GitUser } from '@entities/git-user.entity';
import { Gist } from '@entities/gist.entity';

@Injectable({

	providedIn: 'root',

}) export class GithubService {

	private readonly github = {

		user: 'user'

	};

	private userName: string | undefined = undefined; 

	private readonly userEndpoint = `${this.baseUrl}/${this.github.user}`;
	public constructor(

		private readonly http: HttpClient,
		@Inject('GITHUB_API_URL') private readonly baseUrl: string

	) {}

	public profile(): Observable<HttpResponse<GitUser>> {

		return this.http.get<GitUser>(`${this.userEndpoint}`, {

			observe: 'response'

		}).pipe(tap((res: HttpResponse<GitUser>) => {

			if (res.body) {

				this.userName = res.body?.login;

			}

		}));

	}

	public getGists(): Observable<Gist[]> {

		if (!this.userName) {

			return of([]);

		}

		return this.http.get<Gist[]>(`${this.baseUrl}/users/${this.userName}/gists`);

	}

}