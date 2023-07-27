import { Unsubscribe } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface IUser {
	displayName: string;
	email: string;
	uid: string;
}

export interface IAnonymous {
	uid: string;
}

export type TResult = IUser | IAnonymous | null;

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<TResult, void>({
			providesTags: ['User'],
			queryFn() {
				return { data: null };
			},
			async onCacheEntryAdded(
				unusedArgument,
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved }
			) {
				const auth = getAuth();
				let unsubscribe: Unsubscribe;

				await cacheDataLoaded;

				unsubscribe = onAuthStateChanged(auth, (userData) => {
					if (userData) {
						updateCachedData(() => {
							const resData = userData.providerData[0];
							if (!resData) {
								// is anonymously logged
								return {
									uid: userData.uid,
								};
							}
							return {
								uid: resData.uid,
								email: resData.email,
								displayName: resData.displayName,
							};
						});
					} else {
						updateCachedData(() => {
							return null;
						});
					}
				});

				await cacheEntryRemoved;
				unsubscribe && unsubscribe();
			},
		}),
	}),
});

export const { useGetUserQuery } = userApi;
