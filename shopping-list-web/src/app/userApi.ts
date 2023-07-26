import { Unsubscribe } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export interface IUser {
	displayName: string;
	email: string;
	uid: string;
}

type TResult = IUser | {};

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<TResult, any>({
			providesTags: ['User'],
			queryFn(_: any = {}) {
				return { data: {} };
			},
			async onCacheEntryAdded(
				_: any = {},
				{ cacheDataLoaded, updateCachedData, cacheEntryRemoved }
			) {
				const auth = getAuth();
				let unsubscribe: Unsubscribe;

				await cacheDataLoaded;

				unsubscribe = onAuthStateChanged(auth, (userData) => {
					if (userData) {
						updateCachedData(() => {
							const resData = userData.providerData[0];

							return {
								uid: resData.uid,
								email: resData.email,
								displayName: resData.displayName,
							};
						});
					} else {
						updateCachedData(() => {
							return {};
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
