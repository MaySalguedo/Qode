import { Component, OnInit } from '@angular/core';

import { GithubService } from '@github/github.service';
import { GitUser } from '@entities/git-user.entity';

@Component({

	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,

}) export class AppComponent implements OnInit {

	public user!: GitUser;

	public constructor(

		private githubService: GithubService

	) {}

	public ngOnInit(): void {

		this.githubService.profile().subscribe({

			next: (t) => {

				const user = t.body;

				if (user) this.user = user;

			}, error: (e) => {console.log(e);}

		});

	}

}