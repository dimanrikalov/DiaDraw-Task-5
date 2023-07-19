import { DocumentData, DocumentReference } from 'firebase/firestore';
import { COLLECTIONS } from './collectionEnums';

export interface Product {
	name: string;
	quantity: number;
	price: number;
}

export interface ProductEntry extends Product {
	id: string;
	ref: DocumentReference<DocumentData, DocumentData>
}

export interface CreateProductBody extends Product {
    collectionToModify: COLLECTIONS
}
