import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GistQrModalComponent } from '@components/gist/gist-qr-modal/gist-qr-modal.component';
import { HeaderService } from '@feature/services/header/header.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GithubService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { SwalService } from '@swal/swal.service';
import { Gist } from '@entities/gist.entity';
import { GistFile } from '@models/gist-file.model';
import { SessionEventService } from '@shared/services/session-event/session-event.service';
import { Subscription } from 'rxjs';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage implements OnDestroy, OnInit {

	public gists$: Observable<Gist[]> = of([]);
	public currentUserId: number = 0;

	private scannerSub!: Subscription;

	public constructor(

		@Inject('IS_NATIVE_PLATFORM') public readonly isNativePlatform: boolean,
		private headerService: HeaderService,
		private githubService: GithubService,
		private modalController: ModalController,
		private swalService: SwalService,
		private sessionEventService: SessionEventService

	) {

		this.headerService.show('Qode Gists');

	}

	public ngOnInit(): void {

		this.scannerSub = this.sessionEventService.sessionScanned$.subscribe({

			next: (id) => {

				this.onSessionScanned(id);

			}, error: (e: any) => this.swalService.showException('QR Exception', e.message)

		});

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

	public ngOnDestroy(): void {
		if (this.scannerSub) this.scannerSub.unsubscribe();
	}

	public async onGistSelected(gist: Gist): Promise<void> {

		const readmeFile: GistFile | undefined = this.extractReadmeFile(gist);
		let readme = undefined;

		if (readmeFile){

			readme = readmeFile.content ? readmeFile.content : await this.githubService.getGistRawFileContent(readmeFile);

		}

		const modal = await this.modalController.create({

			component: GistQrModalComponent,

			componentProps: {

				gistUrl: gist.html_url,
				gistTitle: gist.description,
				readmeContent: readme

			}, breakpoints: [0, 0.6, 1], initialBreakpoint: 0.6,

		});

		await modal.present();

	}

	public async onGistScanned(content: string): Promise<void> {

		const id = this.extractGistId(content);

		if (id) {

			const gist = await this.githubService.getGist(id);

			await this.onGistSelected(gist);

		}

	}

	public async onSessionScanned(id: string): Promise<void> {

		this.swalService.showInformation('Session ID', id);

	}

	private extractReadmeFile(gist: Gist): GistFile | undefined {

		const files = Object.values(gist.files);
		
		const readmeFile = files.find((file: any) => 
			file.filename.toUpperCase().includes('README') && 
			(file.language === 'Markdown' || file.filename.endsWith('.md'))
		);

		if (readmeFile) {

			return readmeFile;

		}

		return undefined;

	}

	private extractGistId(url: string): string | undefined {

		if (/^[a-f0-9]{32}$/.test(url)) return url;

		try {

			const urlObj = new URL(url);
			const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
			
			return pathParts.length >= 1 ? pathParts[pathParts.length - 1] : undefined;

		} catch {

			return undefined;

		}

	}

}