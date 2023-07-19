import {
	ApiProvider,
	createApi,
	fakeBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
	CreateProductBody,
	Product,
	ProductEntry,
} from '../types/productInterface';
import {
	DocumentData,
	DocumentReference,
	addDoc,
	collection,
	deleteDoc,
	getDoc,
	getDocs,
	onSnapshot,
	query,
} from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';
import { COLLECTIONS } from '../types/collectionEnums';

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getAllProducts: builder.query<ProductEntry[] | string, string>({
			providesTags: ['Products'],
			queryFn: async (collectionName: string) => {
				try {
					const ref = collection(firestore, collectionName);
					const querySnapshot = await getDocs(ref);
					let res: ProductEntry[] = [];
					querySnapshot.docs?.forEach((doc) => {
						res.push({
							...(doc.data() as Product),
							id: doc.id,
							ref: doc.ref,
						});
					});
					console.log(res);
					return res;
				} catch (err: any) {
					return err.message;
				}
			},
			async onCacheEntryAdded(
				products,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				let unsubscribe;
				try {
					unsubscribe = onSnapshot(
						collection(firestore, COLLECTIONS.PRODUCTS_TO_BUY),
						(snapshot) => {
							updateCachedData((draft) => {
								return snapshot?.docs?.map((doc) =>
									doc.data()
								) as ProductEntry[];
							});
						}
					);
				} catch (err: any) {
					return err.message;
				}
				await cacheEntryRemoved;
				unsubscribe && unsubscribe();
				return unsubscribe;
			},
		}),
		createProduct: builder.mutation({
			queryFn: async (body: CreateProductBody) => {
				try {
					const ref = collection(firestore, body.collectionToModify);
					const data = {
						name: body.name,
						quantity: body.quantity,
						price: body.price,
					};
					const res = await addDoc(ref, data);
					if (!res) {
						throw new Error('Could not create element');
					}
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		deleteAll: builder.mutation({
			queryFn: async (collectionToDelete: COLLECTIONS) => {
				try {
					const ref = collection(firestore, collectionToDelete);
					const querySnapshot = await getDocs(ref);
					await Promise.all(
						querySnapshot.docs.map(
							(doc) => new Promise(() => deleteDoc(doc.ref))
						)
					);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		moveAll: builder.mutation({
			queryFn: async ({
				srcCollection,
				destCollection,
			}: {
				srcCollection: COLLECTIONS;
				destCollection: COLLECTIONS;
			}) => {
				try {
					const srcRef = collection(firestore, srcCollection);
					const destRef = collection(firestore, destCollection);

					const querySnapshot = await getDocs(srcRef);
					await Promise.all(
						querySnapshot.docs.map(
							(product) =>
								new Promise(async () => {
									addDoc(destRef, product.data()).then(() =>
										deleteDoc(product.ref)
									);
								})
						)
					);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		deleteByRef: builder.mutation({
			queryFn: async (ref: DocumentReference) => {
				try {
					await deleteDoc(ref);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
	}),
});

export const {
	useGetAllProductsQuery,
	useCreateProductMutation,
	useDeleteAllMutation,
	useMoveAllMutation,
	useDeleteByRefMutation,
} = productsApi;
