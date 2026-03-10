import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SessionEntity } from '@models/session-entity.model';

@Injectable({

	providedIn: 'root',

}) export class SessionEventService {

	private sessionSource = new Subject<SessionEntity>();
	public sessionScanned$ = this.sessionSource.asObservable();

	public emitSessionSource(source: SessionEntity) {

		this.sessionSource.next(source);

	}

}