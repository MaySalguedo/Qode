import { Timestamp } from "firebase/firestore";
import { SessionEntity } from '@models/session-entity.model';

export interface Session extends SessionEntity {

	status: 'WAITING' | 'GIST_RECEIVED' | 'ANALYZING' | 'DONE',
	projectContext?: string,
	createdAt: Timestamp,
	updatedAt: Timestamp

}