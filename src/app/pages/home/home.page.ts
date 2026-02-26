import { Component, OnInit } from '@angular/core';
import { HeaderService } from '@feature/services/header/header.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GithubService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { Gist } from '@entities/gist.entity';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage {

	public gists$: Observable<Gist[]> = of([]);
	public currentUserId: number = 0;

	public constructor(

		private headerService: HeaderService,
		private githubService: GithubService

	) {

		this.headerService.show('Qode Gists');

	}

	public ngOnInit(): void {

		this.gists$ = this.githubService.profile().pipe(

			tap(res => {
				if (res.body) this.currentUserId = res.body.id;
			}),
			switchMap(() => this.githubService.getGists()),
			catchError(err => {
				console.error('Error loading gists:', err);
				return of([]);
			})
		);
	}

	public onGistSelected(gist: Gist): void {

		console.log('Gist seleccionado para ver QR:', gist.id);

	}

}