import { ROUTES } from '../../router';
import { Item } from '../utils/Item/Item';
import { MdCancel } from 'react-icons/md';
import { List } from '../utils/List/List';
import styles from './AddItems.module.css';
import { HiDocument } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { DocumentData } from 'firebase/firestore';
import { IoChevronBackCircle } from 'react-icons/io5';
import { useFetchAllQuery } from '../../app/features/product/productSlice';
import { COLLECTIONS } from '../../enums/collectionEnums';

export const AddItems = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<DocumentData[]>([]);
	const {data, isLoading} = useFetchAllQuery(COLLECTIONS.PRODUCTS_TO_BUY);

	const handleCancel = () => {
		// handleDelete(COLLECTIONS.PRODUCTS_TO_BE_ADDED);
		// setProducts([]);
	};

	const handleSubmit = () => {
		// handleMove(
		// 	COLLECTIONS.PRODUCTS_TO_BE_ADDED,
		// 	COLLECTIONS.PRODUCTS_TO_BUY
		// );
		// setProducts([]);
	};

	return (
		<div className={styles.container}>
			<div className={styles.listContainer}>
				<div className={styles.titleDiv}>
					<h4>Items to add</h4>
					<div className={styles.operationsContainer}>
						<Button
							icon={<HiDocument />}
							onClick={() => navigate(ROUTES.CREATE_ITEM)}
						/>
						<Button
							icon={<IoIosAddCircle />}
							onClick={handleSubmit}
						/>
						<Button icon={<MdCancel />} onClick={handleCancel} />
					</div>
					<Button
						icon={<IoChevronBackCircle />}
						onClick={() => navigate(ROUTES.HOME)}
					/>
				</div>
				<List>
					{
						isLoading === true ? <h4>Loading...</h4> :
						data && data.length > 0 ? 
							data.map((product) => (
								<Item
									key={Math.random()}
									name={product.name}
									price={product.price}
									quantity={product.quantity}
								/>
							)): (<h4>List is currently empty</h4>)
					}
					{/* // {products.length > 0 ? (
					// 	products.map((product) => (
					// 		<Item
					// 			key={Math.random()}
					// 			name={product.name}
					// 			price={product.price}
					// 			quantity={product.quantity}
					// 		/>
					// 	))
					// ) : (
					// 	<h4>List is currently empty</h4>
					// )} */}
				</List>
			</div>
		</div>
	);
};
