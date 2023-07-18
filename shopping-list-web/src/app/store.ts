import { configureStore } from '@reduxjs/toolkit';
import productsApi from './features/product/productSlice';

export const store = configureStore({
	reducer: {
		[productsApi.reducerPath]: productsApi.reducer
		// product: productReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware)

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
