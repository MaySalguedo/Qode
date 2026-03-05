import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({

	providedIn: 'root',

}) export class SessionEventService {

	private sessionSource = new Subject<string>();
	public sessionScanned$ = this.sessionSource.asObservable();

	public emitSessionId(id: string) {

		this.sessionSource.next(id);

	}

}