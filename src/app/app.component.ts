import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { GithubService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { TokenService } from '@token/token.service';
import { GitUser } from '@entities/git-user.entity';
import { StatusBar } from '@capacitor/status-bar';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { BestPracticeService } from '@core/services/firebase/practice/best-practice.service';

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
		private bestPracticeService: BestPracticeService,
		private zone: NgZone,
		@Inject('IS_NATIVE_PLATFORM') private isNativePlatform: boolean,

	) {

		this.initializeApp();

	}

	public async ngOnInit(): Promise<void> {

		if (this.isNativePlatform) {

			await StatusBar.hide();
			await NavigationBar.hide();

		}

		const credential = await this.authService.handleRedirectResult();

		if (credential?.accessToken){

			this.tokenService.setAccess(credential.accessToken);
			this.router.navigate(['/home']);

		}

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