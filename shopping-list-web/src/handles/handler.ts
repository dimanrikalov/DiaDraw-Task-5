import {
	addDoc,
	collection,
	deleteDoc,
	getDocs,
	query,
} from 'firebase/firestore';
import { COLLECTIONS } from '../enums/collectionEnums';
import { firestore } from '../firebase_setup/firebase';

export class Handler {
	constructor() {}

	async getAll(collectionToQuery: COLLECTIONS) {
		const q = query(collection(firestore, collectionToQuery));
		const querySnapshot = await getDocs(q);
		return querySnapshot;
	}

	async create(productData: any, collectionToModify: COLLECTIONS) {
		console.log(collectionToModify);
		const ref = collection(firestore, collectionToModify); // Firebase creates this automatically

		try {
			addDoc(ref, productData);
		} catch (err) {
			console.log(err);
		}
	}

	async moveAll(source: COLLECTIONS, destination: COLLECTIONS) {
		try {
			this.getAll(source).then((querySnapshot) => {
				querySnapshot.forEach((x) => {
					this.create(x.data(), destination);
					deleteDoc(x.ref);
				});
			});
		} catch (err) {
			console.log(err);
		}
	}

	async deleteAll(collectionToModify: COLLECTIONS, id?: string) {
		if (id) {
			try {
				this.getAll(collectionToModify).then((querySnapshot) => {
					querySnapshot.forEach((x) => {
						deleteDoc(x.ref);
					});
				});
			} catch (err) {}
		}

		try {
			this.getAll(collectionToModify).then((querySnapshot) => {
				querySnapshot.forEach((x) => {
					deleteDoc(x.ref);
				});
			});
		} catch (err) {
			console.log(err);
		}
	}
}
