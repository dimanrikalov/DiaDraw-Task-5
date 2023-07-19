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
	doc,
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
			queryFn(collection: COLLECTIONS) {
				return { data: [] };
			},
			async onCacheEntryAdded(
				collectionName: COLLECTIONS,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				let unsubscribe;
				try {
					unsubscribe = onSnapshot(
						collection(firestore, collectionName),
						(snapshot) => {
							updateCachedData((draft) => {
								return snapshot?.docs?.map((doc) => {
									return {
										...doc.data(),
										id: doc.id,
									};
								}) as ProductEntry[];
							});
						}
					);
				} catch (err: any) {
					throw new Error('Error fetching products');
				}
				await cacheEntryRemoved;
				unsubscribe && unsubscribe();
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
		deleteProduct: builder.mutation({
			queryFn: async ({
				collectionName,
				id,
			}: {
				collectionName: COLLECTIONS;
				id: string;
			}) => {
				try {
					const ref = doc(firestore, collectionName, id);
					await deleteDoc(ref);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		moveProduct: builder.mutation({
			queryFn: async ({
				collectionName,
				id,
			}: {
				collectionName: COLLECTIONS;
				id: string;
			}) => {
				if (collectionName === COLLECTIONS.PRODUCTS_TO_BUY) {
					try {
						const ref = doc(
							firestore,
							COLLECTIONS.PRODUCTS_TO_BUY,
							id
						);
						const productData = (await getDoc(ref)).data();

						const collectionRef = collection(
							firestore,
							COLLECTIONS.BOUGHT_PRODUCTS
						);

						await addDoc(collectionRef, productData);
						await deleteDoc(ref);
					} catch (err: any) {
						return err.message;
					}
				} else {
					try {
						const ref = doc(
							firestore,
							COLLECTIONS.BOUGHT_PRODUCTS,
							id
						);
						const productData = (await getDoc(ref)).data();

						const collectionRef = collection(
							firestore,
							COLLECTIONS.PRODUCTS_TO_BUY
						);

						await addDoc(collectionRef, productData);
						await deleteDoc(ref);
					} catch (err: any) {
						return err.message;
					}
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
	useDeleteProductMutation,
	useMoveProductMutation,
} = productsApi;
