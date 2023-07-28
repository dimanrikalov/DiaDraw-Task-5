import { ROUTES } from '../../router';
import { useDispatch } from 'react-redux';
import { IoLogOut } from 'react-icons/io5';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { ListContainer } from './ListContainer';
import { getAuth, signOut } from 'firebase/auth';
import { toggle } from '../../app/editModeSlice';
import { RiEditCircleFill } from 'react-icons/ri';
import { useGetUserQuery } from '../../app/userApi';
import { useGetAllProductsQuery, COLLECTIONS } from '../../app/productsApi';
import { useTranslation } from 'react-i18next';
export const ToBuyList = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();

	const { data: productsToBuy, isLoading: isLoadingToBuy } =
		useGetAllProductsQuery(
			{
				creatorId: userData!.uid,
				collection: COLLECTIONS.PRODUCTS_TO_BUY,
				priceCondition: 0,
			},
			{ skip: !userData }
		);

	const { data: boughtProducts, isLoading: isLoadingBought } =
		useGetAllProductsQuery(
			{
				creatorId: userData!.uid,
				collection: COLLECTIONS.BOUGHT_PRODUCTS,
				priceCondition: 0,
			},
			{ skip: !userData }
		);

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

	if (isLoadingUser) {
		return <h1>{t('loading', {percent:'100'})}</h1>;
	}

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
					header={t('items_to_buy')}
					isLoading={isLoadingToBuy}
					products={productsToBuy}
					collectionName={COLLECTIONS.PRODUCTS_TO_BUY}
				/>
				<ListContainer
					header={t('bought_items')}
					isLoading={isLoadingBought}
					products={boughtProducts}
					collectionName={COLLECTIONS.BOUGHT_PRODUCTS}
				/>
			</div>
		</div>
	);
};
