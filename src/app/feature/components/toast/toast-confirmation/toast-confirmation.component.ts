import { Component, OnInit } from '@angular/core';
import { ToastService } from '@feature/services/toast/toast.service';
import { ToastState } from '@models/toast-state.model';
import { Observable } from 'rxjs';

@Component({

	selector: 'app-toast-confirmation',
	templateUrl: './toast-confirmation.component.html',
	styleUrls: ['./toast-confirmation.component.scss'],
	standalone: false

}) export class ToastConfirmationComponent implements OnInit {

	public state$: Observable<ToastState> = this.toastService.state$;

	public constructor(private toastService: ToastService) { }

	public ngOnInit(): void {}

	public close(): void {
		this.toastService.hide();
	}

}