import { useGetUserQuery } from './app/userApi';
import { SignIn } from './components/SignIn/SignIn';
import { SignUp } from './components/SignUp/SignUp';
import { Welcome } from './components/Welcome/Welcome';
import { AddItems } from './components/AddItems/AddItems';
import { ToBuyList } from './components/ToBuyList/ToBuyList';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { CreateItem } from './components/CreateItem/CreateItem';

export enum ROUTES {
	HOME = '/',
	WELCOME = '/welcome',
	SIGN_IN = '/auth/login',
	ADD_ITEM = '/add-item',
	SIGN_UP = '/auth/register',
	CREATE_ITEM = '/create-item',
	ALREADY_BOUGHT_ITEMS = '/bought-items',
}

enum GUARD_TYPE {
	USER = 'user',
	GUEST = 'guest',
}

const AuthGuard = ({ guardType }: { guardType: GUARD_TYPE }) => {
	const { data: user, isLoading } = useGetUserQuery(undefined);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	if (guardType === GUARD_TYPE.GUEST) {
		if (user && 'uid' in user) {
			return <Navigate to={ROUTES.HOME} />;
		}

		return <Outlet />;
	}

	if (user && 'uid' in user) {
		return <Outlet />;
	}

	return <Navigate to={ROUTES.WELCOME} />;
};

export const Router = () => {
	const router = useRoutes([
		{
			element: <AuthGuard guardType={GUARD_TYPE.GUEST} />,
			children: [
				{
					path: ROUTES.WELCOME,
					element: <Welcome />,
				},
				{
					path: ROUTES.SIGN_UP,
					element: <SignUp />,
				},
			],
		},
		{
			path: ROUTES.SIGN_IN,
			element: <SignIn />
		},
		{
			element: <AuthGuard guardType={GUARD_TYPE.USER} />,
			children: [
				{
					path: ROUTES.HOME,
					element: <ToBuyList />,
				},
				{
					path: ROUTES.ADD_ITEM,
					element: <AddItems />,
				},
				{
					path: ROUTES.CREATE_ITEM,
					element: <CreateItem />,
				},
			],
		},
	]);
	return router;
};
