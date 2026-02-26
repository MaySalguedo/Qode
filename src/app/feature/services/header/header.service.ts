import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({

	providedIn: 'root'

}) export class HeaderService {

	private _isShown: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	public isShown$: Observable<boolean> = this._isShown.asObservable();
	public pageMessage: string = 'Page';

	public constructor() {}

	public show(pageMessage: string = 'Page'): void {

		this.pageMessage = pageMessage;
		this._isShown.next(true);

	}

	public hide(): void {

		this._isShown.next(false);

	}

}