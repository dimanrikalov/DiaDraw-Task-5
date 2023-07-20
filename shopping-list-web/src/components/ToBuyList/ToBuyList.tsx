import { ROUTES } from '../../router';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { ListContainer } from './ListContainer';
import { RiEditCircleFill } from 'react-icons/ri';
import { COLLECTIONS } from '../../types/collectionEnums';
import { useGetAllProductsQuery } from '../../app/productsApi';

export const ToBuyList = () => {
	const navigate = useNavigate();
	const { data: productsToBuy, isLoading: isLoadingToBuy } =
		useGetAllProductsQuery(COLLECTIONS.PRODUCTS_TO_BUY);

	const { data: boughtProducts, isLoading: isLoadingBought } =
		useGetAllProductsQuery(COLLECTIONS.BOUGHT_PRODUCTS);

	return (
		<div className={styles.container}>
			<div className={styles.operationsContainer}>
				<Button
					icon={<IoIosAddCircle />}
					onClick={() => navigate(ROUTES.ADD_ITEM)}
				/>
				<Button icon={<RiEditCircleFill />} />
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
