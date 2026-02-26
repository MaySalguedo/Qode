import { Injectable } from '@angular/core';
import { SweetAlertResult } from 'sweetalert2';
import Swal from 'sweetalert2';

export let ErrorMessage = (e: any): string => {

	const message = e?.error?.message || e.message || e;

	return message as unknown as string;

};

@Injectable({

	providedIn: 'root'

}) export class SwalService {

	public constructor() {}

	public async showException(title: string, text: string): Promise<SweetAlertResult> {

		return await Swal.fire({

			title,
			text,
			icon: 'error',
			showCancelButton: false,
			confirmButtonColor: '#03fc5a',
			confirmButtonText: 'ok',
			heightAuto: false

		});

	}

	public async showInformation(title: string, text: string): Promise<SweetAlertResult> {

		return await Swal.fire({

			title,
			text,
			icon: 'success',
			showCancelButton: false,
			confirmButtonColor: '#03fc5a',
			confirmButtonText: 'ok',
			heightAuto: false

		});

	}

	public async getConfirmation(title: string, text: string): Promise<SweetAlertResult> {

		return await Swal.fire({

			title,
			text,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#03fc5a',
			confirmButtonText: 'yes',
			cancelButtonText: 'no',
			heightAuto: false

		});

	}

}