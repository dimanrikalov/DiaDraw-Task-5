import { useEffect, useState } from 'react';
import { ROUTES } from '../../router';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { RiEditCircleFill } from 'react-icons/ri';
import { DocumentData } from 'firebase/firestore';
import { COLLECTIONS } from '../../enums/collectionEnums';
import { fetchAllProducts } from '../../utils/firestore-operations';

export const ToBuyList = () => {
	const navigate = useNavigate();
	const [itemsToBuy, setItemsToBuy] = useState<DocumentData[]>([]);
	const [boughtItems, setBoughtItems] = useState<DocumentData[]>([]);
	const [isLoadingItemsToBuy, setIsLoadingItemsToBuy] = useState(true);
	const [isLoadingBoughtItems, setIsLoadingBoughtItems] = useState(true);
	useEffect(() => {
		setIsLoadingItemsToBuy(true);
		setIsLoadingBoughtItems(true);

		fetchAllProducts(COLLECTIONS.PRODUCTS_TO_BUY).then((res) => {
			setIsLoadingItemsToBuy(false);
			setItemsToBuy(res.data);
		});
		fetchAllProducts(COLLECTIONS.BOUGHT_PRODUCTS).then((res) => {
			setIsLoadingBoughtItems(false);
			setBoughtItems(res.data);
		});

	}, [setItemsToBuy, setIsLoadingItemsToBuy, setIsLoadingBoughtItems]);

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
						{isLoadingItemsToBuy === true ? (
							<h4>Loading...</h4>
						) : itemsToBuy && itemsToBuy.length > 0 ? (
							itemsToBuy.map((product) => (
								<Item
									key={Math.random()}
									name={product.name}
									price={product.price}
									quantity={product.quantity}
									id={product.id}
									collection={COLLECTIONS.PRODUCTS_TO_BUY}
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
						{isLoadingBoughtItems === true ? (
							<h4>Loading...</h4>
						) : boughtItems && boughtItems.length > 0 ? (
							boughtItems.map((product) => (
								<Item
									key={Math.random()}
									name={product.name}
									price={product.price}
									quantity={product.quantity}
									id={product.id}
									collection={COLLECTIONS.BOUGHT_PRODUCTS}
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
