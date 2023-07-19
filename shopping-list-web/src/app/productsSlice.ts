import { Product } from '../types/productInterface';
import { COLLECTIONS } from '../types/collectionEnums';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
	productsToAdd: Product[];
	productsToBuy: Product[];
	boughtProducts: Product[];
}

const initialState: ProductsState = {
	productsToAdd: [],
	productsToBuy: [],
	boughtProducts: [],
};

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		create: (state, action: PayloadAction<Product>) => {
			state.productsToAdd.push(action.payload);
		},
		getAll: (state, action: PayloadAction<COLLECTIONS>) => {
			//get all
		},
		deleteAll: (state, action: PayloadAction<COLLECTIONS>) => {
			switch (action.payload) {
				case COLLECTIONS.PRODUCTS_TO_BE_ADDED:
					return { ...state, productsToAdd: [] };
				case COLLECTIONS.PRODUCTS_TO_BUY:
					return { ...state, productsToBuy: [] };
				case COLLECTIONS.BOUGHT_PRODUCTS:
					return { ...state, boughtProducts: [] };
			}
		},
		moveAll: (
			state,
			action: PayloadAction<{
				srcCollection: COLLECTIONS;
				destCollection: COLLECTIONS;
			}>
		) => {
			state[action.payload.srcCollection].forEach((product) => {
				state[action.payload.destCollection].push(product);
			});
			state[action.payload.srcCollection] = [];
		},
		getById: (state, action: PayloadAction<{ id: string }>) => {
			// const unified = [...state.productsToAdd, ...state.productsToBuy, ...state.boughtProducts];
			// return unified.find(product => product.id === action.payload.id);
		},
		deleteById: (state, action: PayloadAction<{ id: string }>) => {
			//search every array 1 by one
		},
	},
});

export const { create, getAll, deleteAll, moveAll, getById, deleteById } =
	productsSlice.actions;

export default productsSlice.reducer;
