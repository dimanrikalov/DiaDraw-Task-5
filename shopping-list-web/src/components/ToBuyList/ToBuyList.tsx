import { ROUTES } from '../../router';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
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
				<div className={styles.listContainer}>
					<h4>Items to buy</h4>
					<List>
						{isLoadingToBuy === true ? (
							<h4>Loading...</h4>
						) : productsToBuy &&
						  typeof productsToBuy !== 'string' &&
						  productsToBuy.length > 0 ? (
							productsToBuy.map((product) => (
								<Item
									key={Math.random()}
									name={product.name}
									price={product.price}
									quantity={product.quantity}
									id={product.id}
									collectionName={COLLECTIONS.PRODUCTS_TO_BUY}
								/>
							))
						) : (
							<h4>List is currently empty</h4>
						)}
					</List>
				</div>
				<div className={styles.listContainer}>
					<h4>Bought items</h4>
					<List>
						{isLoadingBought === true ? (
							<h4>Loading...</h4>
						) : boughtProducts &&
						  typeof boughtProducts !== 'string' &&
						  boughtProducts.length > 0 ? (
							boughtProducts.map((product) => (
								<Item
									key={Math.random()}
									name={product.name}
									price={product.price}
									quantity={product.quantity}
									id={product.id}
									collectionName={COLLECTIONS.BOUGHT_PRODUCTS}
								/>
							))
						) : (
							<h4>List is currently empty</h4>
						)}
					</List>
				</div>
			</div>
		</div>
	);
};
