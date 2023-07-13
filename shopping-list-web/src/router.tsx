import {useRoutes} from 'react-router-dom';
import { AddItems } from './components/AddItems/AddItems';
import { ToBuyList } from './components/ToBuyList/ToBuyList';

export enum ROUTES {
    HOME = '/',
    ADD_ITEM = '/add-item'
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
        }
    ])
}