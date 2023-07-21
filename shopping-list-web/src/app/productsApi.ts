import {
	doc,
	getDoc,
	addDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	collection,
	onSnapshot,
	Unsubscribe,
	DocumentData,
	FirestoreError,
	DocumentReference,
} from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export enum COLLECTIONS {
	PRODUCTS_TO_BUY = 'productsToBuy',
	BOUGHT_PRODUCTS = 'boughtProducts',
	PRODUCTS_TO_BE_ADDED = 'productsToAdd',
}

export interface Product {
	name: string;
	price: number;
	quantity: number;
}

export interface ProductEntry extends Product {
	id: string;
	ref: DocumentReference<DocumentData, DocumentData>;
}

export interface CreateProductBody extends Product {
	collectionToModify: COLLECTIONS;
}

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
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved }
			) {
				let unsubscribe: Unsubscribe;
				let error;

				await cacheDataLoaded;

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
					(err: FirestoreError) => {
						error = { ...err };
					}
				);

				if (error) {
					return error;
				}

				await cacheEntryRemoved;
				unsubscribe && unsubscribe();

				return new Promise(() => {
					unsubscribe();
				});
			},
		}),
		createProduct: builder.mutation({
			queryFn: (body: CreateProductBody) => {
				let error;

				const ref = collection(firestore, body.collectionToModify);
				const data = {
					name: body.name,
					quantity: body.quantity,
					price: body.price,
				};

				addDoc(ref, data).catch((err) => (error = { ...err }));
				return { error };
			},
		}),
		deleteAll: builder.mutation({
			queryFn: (collectionToDelete: COLLECTIONS) => {
				let error;

				const ref = collection(firestore, collectionToDelete);
				getDocs(ref)
					.then((querySnapshot) => {
						Promise.all(
							querySnapshot.docs.map(
								(doc) => new Promise(() => deleteDoc(doc.ref))
							)
						).catch((err) => {
							error = { ...err }; //could not fulfill all delete docs promises
						});
					})
					.catch((err: any) => {
						error = { ...err }; //could not get the docs
					});

				return { error };
			},
		}),
		moveAll: builder.mutation({
			queryFn: ({ srcCollection, destCollection }: IMoveAllBody) => {
				let error;

				const srcRef = collection(firestore, srcCollection);
				const destRef = collection(firestore, destCollection);

				getDocs(srcRef)
					.then((querySnapshot) => {
						Promise.all(
							querySnapshot.docs.map(
								(product) =>
									new Promise(() => {
										addDoc(destRef, product.data()).then(
											() => deleteDoc(product.ref)
										);
									})
							)
						).catch((err) => {
							error = { ...err }; //could not fulfill all add docs promises
						});
					})
					.catch((err) => {
						error = { ...err }; //could not get the docs
					});

				return { error };
			},
		}),
		editProduct: builder.mutation({
			queryFn: ({ collectionName, id, data }: IEditProduct) => {
				let error;

				updateDoc(doc(firestore, collectionName, id), {
					...data,
				}).catch((err) => {
					error = { ...err };
				});

				return { error };
			},
		}),
		deleteProduct: builder.mutation({
			queryFn: ({ collectionName, id }: IModifyProduct) => {
				let error;

				const ref = doc(firestore, collectionName, id);
				deleteDoc(ref).catch((err) => {
					error = { ...err };
				});

				return { error };
			},
		}),
		moveProduct: builder.mutation({
			queryFn: async ({ collectionName, id }: IModifyProduct) => {
				let error;

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
					error = { ...err };
				}

				return { error };
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
