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
	FirestoreError,
} from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export enum COLLECTIONS {
	PRODUCTS_TO_BUY = 'productsToBuy',
	BOUGHT_PRODUCTS = 'boughtProducts',
	PRODUCTS_TO_BE_ADDED = 'productsToAdd',
}

export interface IProduct {
	id: string;
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
	creatorId: string;
}

export interface ICreateProduct {
	name: string;
	price: number;
	quantity: number;
	imageUrl: string;
	creatorId: string;
	collectionToModify: COLLECTIONS;
}

export interface IUserProducts {
	creatorId: string;
	collection: COLLECTIONS;
}

interface IEditProductBody {
	name?: string;
	price?: number;
	quantity?: number;
	imageUrl?: string;
	creatorId?: string;
}

export interface IEditProduct {
	id: string;
	collectionName: COLLECTIONS;
	data?: IEditProductBody;
}

export interface IMoveProduct {
	srcCollection: COLLECTIONS;
	destCollection: COLLECTIONS;
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Products'],
	endpoints: (builder) => ({
		getAllProducts: builder.query<IProduct[], IUserProducts>({
			providesTags: ['Products'],
			queryFn() {
				return { data: [] };
			},
			async onCacheEntryAdded(
				collectionToFetch: IUserProducts,
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved }
			) {
				let unsubscribe: Unsubscribe;
				let error;

				await cacheDataLoaded;

				unsubscribe = onSnapshot(
					collection(firestore, collectionToFetch.collection),
					(snapshot) => {
						updateCachedData((draft) => {
							const productsArr = snapshot?.docs?.map((doc) => {
								return {
									...doc.data(),
									id: doc.id,
								};
							}) as IProduct[];
							return productsArr.filter(
								(doc) =>
									doc.creatorId ===
									collectionToFetch.creatorId
							);
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
			queryFn: (body: ICreateProduct) => {
				let error;

				const ref = collection(firestore, body.collectionToModify);
				const data = {
					name: body.name,
					quantity: body.quantity,
					price: body.price,
					imageUrl: body.imageUrl,
					creatorId: body.creatorId,
				};

				addDoc(ref, data).catch((err) => (error = { ...err }));
				if (error) {
					return { error };
				}
				return { data: 'Successfully added!' };
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

				if (error) {
					return { error };
				}

				return { data: 'Successfully delted all items!' };
			},
		}),
		moveAll: builder.mutation({
			queryFn: ({ srcCollection, destCollection }: IMoveProduct) => {
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

				if (error) {
					return { error };
				}

				return { data: 'Successfully moved all items!' };
			},
		}),
		editProduct: builder.mutation({
			queryFn: (body: IEditProduct) => {
				let error;

				updateDoc(doc(firestore, body.collectionName, body.id), {
					...body.data,
				}).catch((err) => {
					error = { ...err };
				});

				if (error) {
					return { error };
				}

				return { data: 'Successfully edited!' };
			},
		}),
		deleteProduct: builder.mutation({
			queryFn: ({ collectionName, id }: IEditProduct) => {
				let error;

				const ref = doc(firestore, collectionName, id);
				deleteDoc(ref).catch((err) => {
					error = { ...err };
				});

				if (error) {
					return { error };
				}

				return { data: 'Successfully deleted!' };
			},
		}),
		moveProduct: builder.mutation({
			queryFn: async ({ collectionName, id }: IEditProduct) => {
				let error = 'No error';

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

				if (error) {
					return { error };
				}
				return { data: 'Successfully moved.' };
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
