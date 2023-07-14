import { ROUTES } from '../../router';
import { MdCancel } from 'react-icons/md';
import { List } from '../utils/List/List';
import styles from './AddItems.module.css';
import { useState, useEffect } from 'react';
import { HiDocument } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import handleQuery from '../../handles/handleQuery';
import { IoChevronBackCircle } from 'react-icons/io5';
import { Item, ItemInterface } from '../utils/Item/Item';

export const AddItems = () => {
	const navigate = useNavigate();
	const [products, setProducts] = useState<ItemInterface[]>([]);

	//fix rendering every element twice
	useEffect(() => {
		handleQuery().then((querySnapshot) => {
			querySnapshot.forEach((x) => {
				const item = x.data().product;
				setProducts((prev) => [...prev, item]);
			});
		});
	}, [setProducts]);

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
						<Button icon={<IoIosAddCircle />} />
						<Button icon={<MdCancel />} />
					</div>
					<Button
						icon={<IoChevronBackCircle />}
						onClick={() => navigate(ROUTES.HOME)}
					/>
				</div>
				<List>
					{products.length > 0 ? (
						products.map((x) => (
							<Item
								key={Math.random()}
								name={x.name}
								price={x.price}
								quantity={x.quantity}
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
