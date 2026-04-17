import { Injectable } from '@angular/core';

import { Firestore, collection, collectionData, addDoc, deleteDoc, updateDoc, doc, getDocs, getDoc, query, where, orderBy, limit } from '@angular/fire/firestore';

import { BestPractice, BEST_PRACTICES_DATA } from '@entities/best-practice.entity';

@Injectable({

	providedIn: 'root',

}) export class BestPracticeService {

	private readonly collectionName: string = 'best-practices';

	public constructor(private firestore: Firestore) {}

	public async findOne(key: NonNullable<BestPractice['id']>): Promise<BestPractice | undefined> {

		return await getDoc(doc(

			collection(this.firestore, this.collectionName),
			key

		)).then((snapshot) => snapshot.data()) as BestPractice | undefined;

	}

	public async findAll(): Promise<Array<BestPractice>> {

		return (await getDocs(collection(this.firestore, this.collectionName))).docs.map(doc => ({

			...doc.data(),
			id: doc.id

		})) as Array<BestPractice>;

	}

	public async insert(entity: BestPractice): Promise<BestPractice['id'] | undefined> {

		const doc = await addDoc(

			collection(this.firestore, this.collectionName),
			entity

		);

		return doc.id;

	}

	public async update(key: NonNullable<BestPractice['id']>, entity: Partial<BestPractice>): Promise<void> {

		await updateDoc(doc(

			this.firestore, `${this.collectionName}/${key}`

		), entity);

	}

	public async delete(key: NonNullable<BestPractice['id']>): Promise<void> {

		await deleteDoc(doc(

			this.firestore,
			`${this.collectionName}/${key}`

		));

	}

}