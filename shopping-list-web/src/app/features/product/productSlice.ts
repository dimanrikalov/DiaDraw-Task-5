import { createSlice } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../../../firebase_setup/firebase';

interface Product {
	name: string;
	price: number;
	quantity: number;
}

export const productsApi = createApi({
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Product'],
	endpoints: (builder) => ({
		fetchItemsToAdd: builder.query<Product[] | undefined, void>({
			async queryFn() {
				try {
					const ref = collection(firestore, 'products-to-buy');
					const querySnapshot = await getDocs(ref);
					let productsToBuy: Product[] = [];
					querySnapshot?.forEach((doc) => {
						productsToBuy.push(doc.data() as Product);
					});
					return { data: productsToBuy };
				} catch (err: any) {
					console.error(err.message);
					return { error: err.message };
				}
			},
		}),
	}),
});

// export interface ProductState {
// 	value: Product[];
// }

// const initialState: ProductState = {
// 	value: [],
// };

// export const productSlice = createSlice({
// 	name: 'product',
// 	initialState,
// 	reducers: {
// 		//immer under the hood so i can directly modify the draftState
// 		createProduct: (draftState) => {

// 			console.log('product creation')
// 		},
// 		deleteProduct: (draftState) => {console.log('product deletion')},
// 		moveProduct: (draftState) => {},
// 	},
// });

// export const { createProduct, deleteProduct, moveProduct } =
// 	productSlice.actions;

// export default productSlice.reducer;
