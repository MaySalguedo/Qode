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
import { BestPractice, BEST_PRACTICES_UPLOAD } from '@entities/best-practice.entity';

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

		//await this.uploadPractices();

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

	private async uploadPractices(): Promise<void> {

		BEST_PRACTICES_UPLOAD.forEach(async (practicde) => {

			const id = await this.bestPracticeService.insert(practicde);

			console.log(id);

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