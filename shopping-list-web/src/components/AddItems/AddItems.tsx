import { ROUTES } from '../../router';
import { Item } from '../utils/Item/Item';
import { MdCancel } from 'react-icons/md';
import { List } from '../utils/List/List';
import styles from './AddItems.module.css';
import { useState, useEffect } from 'react';
import { HiDocument } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import handleMove from '../../handles/handleMove';
import { DocumentData } from 'firebase/firestore';
import handleQuery from '../../handles/handleQuery';
import handleDelete from '../../handles/handleDelete';
import { IoChevronBackCircle } from 'react-icons/io5';
import { COLLECTIONS } from '../../enums/collectionEnums';

export const AddItems = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<DocumentData[]>([]);

	useEffect(() => {
		handleQuery(COLLECTIONS.PRODUCTS_TO_BE_ADDED).then(
			(querySnapshot) => {
				const res: DocumentData[] = [];
				querySnapshot.forEach((x) => {
					res.push(x.data());
				});

				setProducts(res);
			}
		);
	}, [setProducts]);

	const handleCancel = () => {
		handleDelete(COLLECTIONS.PRODUCTS_TO_BE_ADDED);
		setProducts([]);
	};

	const handleSubmit = () => {
		handleMove(
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
					{products.length > 0 ? (
						products.map((product) => (
							<Item
								key={Math.random()}
								name={product.name}
								price={product.price}
								quantity={product.quantity}
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
