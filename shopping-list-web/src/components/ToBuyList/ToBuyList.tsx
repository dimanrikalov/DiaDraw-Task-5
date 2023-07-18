import { ROUTES } from '../../router';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { RiEditCircleFill } from 'react-icons/ri';
import { DocumentData } from 'firebase/firestore';
import { COLLECTIONS } from '../../enums/collectionEnums';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useGetByIdQuery } from '../../app/features/product/productSlice';
// import { createProduct } from '../../app/features/product/productSlice';

export const ToBuyList = () => {
	const navigate = useNavigate();
	const [itemsToBuy, setItemsToBuy] = useState<DocumentData[]>([]);
	// const product = useSelector((state: RootState) => state.product.value);
	const { data } = useGetByIdQuery({
		id: '5V8yro7Hp44HsRYlIg4n',
		collectionName: COLLECTIONS.PRODUCTS_TO_BUY,
	});
	useEffect(() => {
		console.log('Creating a product...');
		// dispatch(createProduct());

		// handleQuery(COLLECTIONS.PRODUCTS_TO_BUY)
		// .then((querySnapshot) => {
		// 		const res: DocumentData[] = [];
		// 		querySnapshot.forEach((x) => {
		// 			res.push(x.data());
		// 		});

		// 		setItemsToBuy(res);
		// 	}
		// );
	}, [setItemsToBuy]);

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
						{itemsToBuy.length > 0 ? (
							itemsToBuy.map((itemToBuy) => (
								<Item
									key={Math.random()}
									name={itemToBuy.name}
									price={itemToBuy.price}
									quantity={itemToBuy.quantity}
								/>
							))
						) : (
							<h4>List is currently empty</h4>
						)}
					</List>
				</div>
				<div className={styles.listContainer}>
					<h4>Bought items</h4>
					<List>{/* <Item /> */}</List>
				</div>
			</div>
		</div>
	);
};
