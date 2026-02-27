import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GistQrModalComponent } from '@components/gist/gist-qr-modal/gist-qr-modal.component';
import { HeaderService } from '@feature/services/header/header.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GithubService } from '@github/github.service';
import { AuthService } from '@auth/auth.service';
import { Gist } from '@entities/gist.entity';
import { GistFile } from '@models/gist-file.model';

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
		private githubService: GithubService,
		private modalController: ModalController

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