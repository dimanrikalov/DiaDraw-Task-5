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

export const ToBuyList = () => {
	const navigate = useNavigate();
	const { data: productsToBuy, isLoading: isLoadingToBuy } =
		useGetAllProductsQuery(COLLECTIONS.PRODUCTS_TO_BUY);

	const { data: boughtProducts, isLoading: isLoadingBought } =
		useGetAllProductsQuery(COLLECTIONS.BOUGHT_PRODUCTS);

	const {data: userData, isLoading} = useGetUserQuery(undefined);

	console.log(userData);

	const dispatch = useDispatch();

	const toggleEditMode = () => {
		dispatch(toggle());
	};

	return (
		<div className={styles.container}>
			<div className={styles.operationsContainer}>
				<Button
					icon={<IoIosAddCircle />}
					onClick={() => navigate(ROUTES.ADD_ITEM)}
				/>
				<Button icon={<RiEditCircleFill />} onClick={toggleEditMode} />
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
