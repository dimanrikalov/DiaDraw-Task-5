import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { Welcome } from './components/Welcome/Welcome';
import { AddItems } from './components/AddItems/AddItems';
import { ToBuyList } from './components/ToBuyList/ToBuyList';
import { CreateItem } from './components/CreateItem/CreateItem';
import { SignUp } from './components/SignUp/SignUp';
import { getAuth } from 'firebase/auth';

export enum ROUTES {
	HOME = '/',
	WELCOME = '/welcome',
	SIGN_IN = '/auth/login',
	ADD_ITEM = '/add-item',
	SIGN_UP = '/auth/register',
	CREATE_ITEM = '/create-item',
	ALREADY_BOUGHT_ITEMS = '/bought-items',
}

const AuthGuard = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	if (!user) {
		return <Navigate to={ROUTES.WELCOME} />;
	}
	return <Outlet />;
};

export const Router = () => {
	const router = useRoutes([
		{
			path: ROUTES.WELCOME,
			element: <Welcome />,
		},
		{
			path: ROUTES.SIGN_UP,
			element: <SignUp />,
		},
		// {
		// 	path: ROUTES.SIGN_IN,
		// 	element: <SignIn />
		// },
		{
			element: <AuthGuard />,
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
