import { Injectable } from '@angular/core';
import { Session } from '@entities/session.entity';

import { Firestore, collection, collectionData, addDoc, deleteDoc, updateDoc, doc, getDocs, getDoc, query, where, orderBy, limit, onSnapshot } from '@angular/fire/firestore';

@Injectable({

	providedIn: 'root',

}) export class SessionService {

	private readonly collectionName: string = 'sessions';

	public constructor(private firestore: Firestore) {}

	public findOne(key: Session['id']): Promise<Session | undefined> {

		return getDoc(doc(

			collection(this.firestore, `${this.collectionName}`),
			key

		)).then((snapshot) => snapshot.data()) as Promise<Session | undefined>;

	}

	public async update(key: Session['id'], entity: Partial<Session>): Promise<void> {

		await updateDoc(doc(

			this.firestore, `${this.collectionName}/${key}`

		), entity);

	}

	public async delete(key: Session['id']): Promise<void> {

		await deleteDoc(doc(

			this.firestore,
			`${this.collectionName}/${key}`

		));

	}

	public subscribeToSession(key: Session['id'], onUpdate: (data: Session) => void): void {
		
		onSnapshot(doc(

			this.firestore, `${this.collectionName}`, key

		), (snapshot) => {

			if (snapshot.exists()) {

				onUpdate(snapshot.data() as Session);

			}

		});

	}

}