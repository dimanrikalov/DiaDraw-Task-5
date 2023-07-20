import {
	doc,
	getDoc,
	addDoc,
	getDocs,
	deleteDoc,
	collection,
	onSnapshot,
	Unsubscribe,
	updateDoc,
	FirestoreError,
} from 'firebase/firestore';
import {
	Product,
	ProductEntry,
	CreateProductBody,
} from '../types/productInterface';
import { firestore } from '../firebase_setup/firebase';
import { COLLECTIONS } from '../types/collectionEnums';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

interface IMoveAllBody {
	srcCollection: COLLECTIONS;
	destCollection: COLLECTIONS;
}
interface IModifyProduct {
	id: string;
	collectionName: COLLECTIONS;
}
interface IEditProduct extends IModifyProduct {
	data: Product;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getAllProducts: builder.query<ProductEntry[], string>({
			providesTags: ['Products'],
			queryFn(collection: COLLECTIONS) {
				return { data: [] };
			},
			async onCacheEntryAdded(
				collectionName: COLLECTIONS,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				let unsubscribe: Unsubscribe;
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
						},
						(error: FirestoreError) => {
							throw new Error(error.message);
						}
					);
				} catch (err: any) {
					return err.message;
				}

				await cacheEntryRemoved;
				unsubscribe && unsubscribe();

				return new Promise(() => {
					unsubscribe();
				});
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
					Promise.all(
						querySnapshot.docs.map(
							(doc) => new Promise(() => deleteDoc(doc.ref))
						)
					).catch((err) => {
						throw new Error('Could not delete all elements!');
					});
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		moveAll: builder.mutation({
			queryFn: async ({
				srcCollection,
				destCollection,
			}: IMoveAllBody) => {
				try {
					const srcRef = collection(firestore, srcCollection);
					const destRef = collection(firestore, destCollection);

					const querySnapshot = await getDocs(srcRef);
					Promise.all(
						querySnapshot.docs.map(
							(product) =>
								new Promise(() => {
									addDoc(destRef, product.data()).then(() =>
										deleteDoc(product.ref)
									);
								})
						)
					).catch((err) => {
						throw new Error('Could not move all elements!');
					});
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		editProduct: builder.mutation({
			queryFn: async ({ collectionName, id, data }: IEditProduct) => {
				try {
					await updateDoc(doc(firestore, collectionName, id), {
						...data,
					}).catch((err) => {
						throw new Error('Could not move all elements!');
					});
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		deleteProduct: builder.mutation({
			queryFn: async ({ collectionName, id }: IModifyProduct) => {
				try {
					const ref = doc(firestore, collectionName, id);
					await deleteDoc(ref).catch((err) => {
						throw new Error('Could not delete element!');
					});
				} catch (err: any) {
					return err.message;
				}
			},
		}),
		moveProduct: builder.mutation({
			queryFn: async ({ collectionName, id }: IModifyProduct) => {
				const [srcCollection, destCollection] =
					collectionName === COLLECTIONS.PRODUCTS_TO_BUY
						? [
								COLLECTIONS.PRODUCTS_TO_BUY,
								COLLECTIONS.BOUGHT_PRODUCTS,
						  ]
						: [
								COLLECTIONS.BOUGHT_PRODUCTS,
								COLLECTIONS.PRODUCTS_TO_BUY,
						  ];

				try {
					const ref = doc(firestore, srcCollection, id);
					const productData = (await getDoc(ref)).data();

					const collectionRef = collection(firestore, destCollection);

					await addDoc(collectionRef, productData);
					await deleteDoc(ref);
				} catch (err: any) {
					return err.message;
				}
			},
		}),
	}),
});

export const {
	useMoveAllMutation,
	useDeleteAllMutation,
	useEditProductMutation,
	useGetAllProductsQuery,
	useMoveProductMutation,
	useCreateProductMutation,
	useDeleteProductMutation,
} = productsApi;
