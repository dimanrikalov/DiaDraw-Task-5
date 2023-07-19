import { firestore } from '../firebase_setup/firebase';
import {
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import { COLLECTIONS } from '../enums/collectionEnums';

interface Product {
	name: string;
	price: number;
	quantity: number;
	ref: DocumentReference;
	id?: string;
}

export interface ProductBody {
	name: string;
	quantity: number;
	price: number;
}

interface CreateProductBody {
	data: ProductBody;
	collectionName: COLLECTIONS;
}

interface MoveProductsBody {
	srcCollection: COLLECTIONS;
	destCollection: COLLECTIONS;
}

export const createProduct = async (
	product: ProductBody,
	collectionName: COLLECTIONS
) => {
	try {
		const ref = collection(firestore, collectionName);
		await addDoc(ref, product);
		return { data: 'success' };
	} catch (err: any) {
		return err.message;
	}
};

export const fetchAllProducts = async (collectionName: COLLECTIONS) => {
	try {
		const ref = collection(firestore, collectionName);
		const querySnapshot = await getDocs(ref);
		let res: any[] = [];
		querySnapshot.docs?.forEach((doc) => {
			res.push({ ...doc.data(), id: doc.id, ref: doc.ref });
		});
		return { data: res };
	} catch (err: any) {
		return err.message;
	}
};

export const getProductById = async (
	id: string,
	collectionName: COLLECTIONS
) => {
	try {
		const snap = await getDoc(doc(firestore, collectionName, id));
		if (!snap.exists()) {
			throw new Error('Product not found!');
		}

		return {
			data: { ...snap.data(), id: snap.id, ref: snap.ref },
		};
	} catch (err: any) {
		return err.message;
	}
};

export const deleteProductById = async (
	id: string,
	collectionName: COLLECTIONS
) => {
	try {
		const res = await getProductById(id, collectionName);
		if (!res.data) {
			throw new Error('Product not found!');
		}
		await deleteDoc(res.data.ref);
		return { message: 'Success' };
	} catch (err: any) {
		return err.message;
	}
};

export const deleteAll = async (collectionName: COLLECTIONS) => {
	try {
		const res = await fetchAllProducts(collectionName);
		if (!res.data) {
			throw new Error('Could not fetch products!');
		}

		await Promise.all(
			res.data.forEach(async (product: any) => {
				new Promise(async () => {
					await deleteDoc(product.ref);
				});
			})
		);
		return { message: 'Success' };
	} catch (err: any) {
		return err.message;
	}
};

export const moveAll = async (
	srcCollection: COLLECTIONS,
	destCollection: COLLECTIONS
) => {
	try {
		const res = await fetchAllProducts(srcCollection);
		if (!res.data) {
			throw new Error('Could not fetch products!');
		}

		const refDest = collection(firestore, destCollection);

		Promise.all(
			res.data.map((product: any) => {
				return new Promise(async () => {
					await addDoc(refDest, product);
					await deleteDoc(product.ref);
				});
			})
		);
	} catch (err: any) {
		return err.message;
	}
};

export const moveById = async (
	id: string,
	srcCollection: COLLECTIONS,
	destCollection: COLLECTIONS
) => {
	const { data: product } = await getProductById(id, srcCollection);
	const ref = collection(firestore, destCollection);

	await addDoc(ref, product);
	await deleteProductById(product.id, srcCollection);
};
