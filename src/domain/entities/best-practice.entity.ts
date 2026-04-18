import { FirestoreEntity } from '@models/firestore-entity.model';
import { BestPracticeCategory } from '@typos/best-practice-option.type';
import { Timestamp } from "firebase/firestore";

export interface BestPractice extends FirestoreEntity {

	name: string,
	description: string,
	category: BestPracticeCategory,
	gist?: string,
	sub_category?: string,
	icon?: string

}