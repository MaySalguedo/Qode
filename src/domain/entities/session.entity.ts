import { SessionEntity } from '@models/session-entity.model';
import { FirestoreEntity } from '@models/firestore-entity.model';

export interface Session extends SessionEntity, Required<FirestoreEntity> {

	status: 'WAITING' | 'GIST_RECEIVED' | 'ANALYZING' | 'DONE' | 'FAILED' | 'REJECTED',
	projectContext?: string

}