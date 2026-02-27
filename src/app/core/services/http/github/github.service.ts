import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { forkJoin, Observable, of, firstValueFrom } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';

import { GitUser } from '@entities/git-user.entity';
import { Gist } from '@entities/gist.entity';
import { GistFile } from '@models/gist-file.model';

@Injectable({

	providedIn: 'root',

}) export class GithubService {

	private readonly github = {

		user: 'user',
		gists: 'gists'

	};

	private readonly userEndpoint = `${this.baseUrl}/${this.github.user}`;
	private readonly gistEndpoint = `${this.baseUrl}/${this.github.gists}`;

	public constructor(

		private readonly http: HttpClient,
		@Inject('GITHUB_API_URL') private readonly baseUrl: string

	) {}

	public profile(): Observable<HttpResponse<GitUser>> {

		return this.http.get<GitUser>(`${this.userEndpoint}`, {

			observe: 'response'

		});

	}

	public getGists(): Observable<Array<Gist>> {

		return this.http.get<Array<Gist>>(`${this.gistEndpoint}`);

	}

	public async getGist(id: string): Promise<Gist> {

		return await firstValueFrom(

			this.http.get<Gist>(`${this.gistEndpoint}/${id}`)

		);

	}

	public async getGistRawFileContent(file: GistFile): Promise<string> {

		return await firstValueFrom(this.http.get(`${file.raw_url}`, {

			responseType: 'text'

		}));

	}

}