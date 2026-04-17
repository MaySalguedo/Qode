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

export const BEST_PRACTICES_UPLOAD: BestPractice[] = [

  // Design Patterns
  { name: 'Singleton', description: 'Ensure a class has only one instance.', category: 'design_pattern', sub_category: 'Creational', icon: 'extension-puzzle-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'Strategy', description: 'Define a family of interchangeable algorithms.', category: 'design_pattern', sub_category: 'Behavioral', icon: 'shuffle-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'Observer', description: 'Notify multiple objects about state changes.', category: 'design_pattern', sub_category: 'Behavioral', icon: 'eye-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  
  // Philosophy
  { name: 'SOLID', description: 'Five principles for maintainable software design.', category: 'philosofy', sub_category: 'Design', icon: 'cube-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'CUPID', description: 'Properties for joyful and human code.', category: 'philosofy', sub_category: 'Design', icon: 'heart-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'Clean Code', description: 'Standards for readability and formatting.', category: 'philosofy', sub_category: 'Readability', icon: 'code-slash-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  
  // Property
  { name: 'ACID', description: 'Guarantees for reliable database transactions.', category: 'property', sub_category: 'Database', icon: 'shield-checkmark-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'CAP Theorem', description: 'Trade-offs in distributed systems.', category: 'property', sub_category: 'Distributed', icon: 'cloud-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },

  // Architecture
  { name: 'Hexagonal', description: 'Decouple core logic from external tools.', category: 'architecture', sub_category: 'Structural', icon: 'grid-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { name: 'Clean Architecture', description: 'Layered structure for independence.', category: 'architecture', sub_category: 'Structural', icon: 'layers-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() }

];

export const BEST_PRACTICES_DATA: BestPractice[] = [

  // Design Patterns
  { id: 'pat_01', name: 'Singleton', description: 'Ensure a class has only one instance.', category: 'design_pattern', sub_category: 'Creational', icon: 'extension-puzzle-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'pat_02', name: 'Strategy', description: 'Define a family of interchangeable algorithms.', category: 'design_pattern', sub_category: 'Behavioral', icon: 'shuffle-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'pat_03', name: 'Observer', description: 'Notify multiple objects about state changes.', category: 'design_pattern', sub_category: 'Behavioral', icon: 'eye-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  
  // Philosophy
  { id: 'phi_01', name: 'SOLID', description: 'Five principles for maintainable OO design.', category: 'philosofy', sub_category: 'Design', icon: 'cube-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'phi_02', name: 'CUPID', description: 'Properties for joyful and human code.', category: 'philosofy', sub_category: 'Design', icon: 'heart-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'phi_03', name: 'Clean Code', description: 'Standards for readability and formatting.', category: 'philosofy', sub_category: 'Readability', icon: 'code-slash-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  
  // Property
  { id: 'pro_01', name: 'ACID', description: 'Guarantees for reliable database transactions.', category: 'property', sub_category: 'Database', icon: 'shield-checkmark-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'pro_02', name: 'CAP Theorem', description: 'Trade-offs in distributed systems.', category: 'property', sub_category: 'Distributed', icon: 'cloud-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },

  // Architecture
  { id: 'arc_01', name: 'Hexagonal', description: 'Decouple core logic from external tools.', category: 'architecture', sub_category: 'Structural', icon: 'grid-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() },
  { id: 'arc_02', name: 'Clean Architecture', description: 'Layered structure for independence.', category: 'architecture', sub_category: 'Structural', icon: 'layers-outline', createdAt: Timestamp.now(), updatedAt: Timestamp.now() }

];