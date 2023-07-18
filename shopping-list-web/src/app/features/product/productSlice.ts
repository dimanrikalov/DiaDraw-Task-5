import { firestore } from '../../../firebase_setup/firebase';
import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
} from 'firebase/firestore';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { COLLECTIONS } from '../../../enums/collectionEnums';

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

const productsApi = createApi({
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Product'],
	endpoints: (builder) => ({
		fetchAll: builder.query<Product[], COLLECTIONS>({
			async queryFn(collectionName) {
				try {
					const ref = collection(firestore, collectionName);
					const querySnapshot = await getDocs(ref);
					let res: Product[] = [];
					querySnapshot?.forEach((doc) => {
						res.push(doc.data() as Product);
					});
					return { data: res };
				} catch (err: any) {
					console.error(err.message);
					return { error: err.message };
				}
			},
			providesTags: ['Product'],
		}),
		create: builder.mutation<undefined | string, CreateProductBody>({
			async queryFn(body) {
				const ref = collection(firestore, body.collectionName); // Firebase creates this automatically

				try {
					await addDoc(ref, body.data);
				} catch (err: any) {
					console.log(err);
					return err.message;
				}
			},
		}),
		moveAll: builder.mutation<undefined | string, MoveProductsBody>({
			async queryFn(body) {
				try {
					const { data } = await fetchAll(collectionToModify);

					if (data) {
						data.forEach((product) => {
							useCreateMutation({
								data: product as ProductBody,
								collectionName: body.destCollection,
							});
							deleteDoc(product.ref);
						});
					}
				} catch (err: any) {
					return err.message;
				}
			},
		}),

		deleteAll: builder.mutation<undefined | string, COLLECTIONS>({
			async queryFn(collectionToModify) {
				try {
					const { data } = useFetchAllQuery(collectionToModify);
					if (typeof data === 'string') {
						throw new Error('Could not fetch collection!');
					}
					if (data) {
						await Promise.all(
							data.map((product) => deleteDoc(product.ref))
						);
					}
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		getById: builder.query<
			Product | string,
			{ id: string; collectionName: COLLECTIONS }
		>({
			async queryFn({ id, collectionName }) {
				try {
					const snap = await getDoc(
						doc(firestore, collectionName, id)
					);
					if (!snap.exists()) {
						throw new Error('Product not found!');
					}

					return {
						data: { ...snap.data(), id: snap.id, ref: snap.ref },
					};
				} catch (err: any) {
					return err.message;
				}
			},
			providesTags: ['Product'],
		}),
		deleteById: builder.mutation<
			undefined | string,
			{ id: string; collectionName: COLLECTIONS }
		>({
			async queryFn(body) {
				try {
					const { data: snapData } = useGetByIdQuery(body);

					if (typeof snapData === 'string') {
						throw new Error('Product to delete not found!');
					}

					deleteDoc(snapData!.ref);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
	}),
});

export const {
	useGetByIdQuery,
	useFetchAllQuery,
	useCreateMutation,
	useMoveAllMutation,
	useDeleteAllMutation,
	useDeleteByIdMutation,
} = productsApi;

export default productsApi;
