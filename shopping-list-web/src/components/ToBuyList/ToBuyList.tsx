import { ROUTES } from '../../router';
import { useDispatch } from 'react-redux';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { ListContainer } from './ListContainer';
import { RiEditCircleFill } from 'react-icons/ri';
import { toggle } from '../../app/editModeSlice';
import { useGetAllProductsQuery, COLLECTIONS } from '../../app/productsApi';
import { useGetUserQuery } from '../../app/userApi';
import { useEffect } from 'react';
import { IoLogOut } from 'react-icons/io5';
import { getAuth, signOut } from 'firebase/auth';

export const ToBuyList = () => {
	const navigate = useNavigate();
	const { data: productsToBuy, isLoading: isLoadingToBuy } =
		useGetAllProductsQuery(COLLECTIONS.PRODUCTS_TO_BUY);

	const { data: boughtProducts, isLoading: isLoadingBought } =
		useGetAllProductsQuery(COLLECTIONS.BOUGHT_PRODUCTS);

	const { data: userData, isLoading } = useGetUserQuery(undefined);

	console.log(userData);

	const dispatch = useDispatch();

	const toggleEditMode = () => {
		dispatch(toggle());
	};

	const logout = () => {
		const auth = getAuth();
		signOut(auth)
			.then(() => {
				console.log('successfully logged out');
				navigate(ROUTES.WELCOME);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	return (
		<div className={styles.container}>
			<div className={styles.operationsContainer}>
				<Button
					icon={<IoIosAddCircle />}
					onClick={() => navigate(ROUTES.ADD_ITEM)}
				/>
				<Button icon={<RiEditCircleFill />} onClick={toggleEditMode} />
				<Button icon={<IoLogOut />} onClick={logout} />
			</div>
			<div className={styles.listsContainer}>
				<ListContainer
					header={'Items to buy'}
					isLoading={isLoadingToBuy}
					products={productsToBuy}
					collectionName={COLLECTIONS.PRODUCTS_TO_BUY}
				/>
				<ListContainer
					header={'Bought items'}
					isLoading={isLoadingBought}
					products={boughtProducts}
					collectionName={COLLECTIONS.BOUGHT_PRODUCTS}
				/>
			</div>
		</div>
	);
};
