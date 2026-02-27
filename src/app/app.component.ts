import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { GithubService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { GitUser } from '@entities/git-user.entity';

@Component({

	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
	standalone: false,

}) export class AppComponent implements OnInit {

	public user!: GitUser;

	public constructor(

		private githubService: GithubService,
		private router: Router,
		private authService: AuthService,
		private tokenService: TokenService,
		private zone: NgZone

	) {

		this.initializeApp();

	}

	public async ngOnInit(): Promise<void> {

		this.githubService.profile().subscribe({

			next: (t) => {

				const user = t.body;

				if (user) this.user = user;

			}, error: (e) => {console.log(e);}

		});

	}

	private initializeApp(): void {

		App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {

			this.zone.run(() => {

				this.router.navigateByUrl('/home');

			});

		});

	}

}