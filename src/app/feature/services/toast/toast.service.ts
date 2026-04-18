import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastState } from '@models/toast-state.model';

@Injectable({

	providedIn: 'root',

}) export class ToastService {

	private toastState = new BehaviorSubject<ToastState>({

		show: false,
		message: '',
		type: 'IDLE'

	});

	public state$ = this.toastState.asObservable();

	public constructor() {}

	public show(message: string, type: ToastState['type']): void {

		this.toastState.next({ show: true, message, type });
		setTimeout(() => this.hide(), 4000);

	}

	public hide(): void {

		this.toastState.next({ ...this.toastState.value, show: false });

	}

}