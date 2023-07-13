import {useRoutes} from 'react-router-dom';
import { AddItems } from './components/AddItems/AddItems';
import { ToBuyList } from './components/ToBuyList/ToBuyList';
import { AlreadyBoughtList } from './components/AlreadyBoughtList/AlreadyBoughtList';
import { CreateItem } from './components/CreateItem/CreateItem';

export enum ROUTES {
    HOME = '/',
    ADD_ITEM = '/add-item',
    CREATE_ITEM = '/create-item',
    ALREADY_BOUGHT_ITEMS = '/bought-items',
}


export const Router = () => {
    const router = useRoutes([
        {
            path: ROUTES.HOME,
            element: <ToBuyList />
        },
        {
            path: ROUTES.ADD_ITEM,
            element: <AddItems />
        },
        {
            path: ROUTES.ALREADY_BOUGHT_ITEMS,
            element: <AlreadyBoughtList />
        },
        {
            path: ROUTES.CREATE_ITEM,
            element: <CreateItem />
        }
    ])
    return router;
}