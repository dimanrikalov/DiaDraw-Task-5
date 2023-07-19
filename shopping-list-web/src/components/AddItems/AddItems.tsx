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
import { COLLECTIONS } from '../../enums/collectionEnums';
import {
	moveAll,
	deleteAll,
	fetchAllProducts,
} from '../../utils/firestore-operations';

export const AddItems = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<DocumentData[]>([]);
	// const {data, isLoading} = useFetchAllQuery(COLLECTIONS.PRODUCTS_TO_BUY);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setIsLoading(true);
		fetchAllProducts(COLLECTIONS.PRODUCTS_TO_BE_ADDED).then((res) => {
			setProducts(res.data);
			setIsLoading(false);
		});
	}, [setIsLoading, setProducts, fetchAllProducts]);

	const handleCancel = async () => {
		await deleteAll(COLLECTIONS.PRODUCTS_TO_BE_ADDED);
		setProducts([]);
	};

	const handleSubmit = async () => {
		await moveAll(
			COLLECTIONS.PRODUCTS_TO_BE_ADDED,
			COLLECTIONS.PRODUCTS_TO_BUY
		);
		setProducts([]);
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
					{isLoading === true ? (
						<h4>Loading...</h4>
					) : products && products.length > 0 ? (
						products.map((product) => (
							<Item
								key={Math.random()}
								name={product.name}
								price={product.price}
								quantity={product.quantity}
								id={product.id}
								collection={COLLECTIONS.PRODUCTS_TO_BE_ADDED}
							/>
						))
					) : (
						<h4>List is currently empty</h4>
					)}
				</List>
			</div>
		</div>
	);
};
