import { ROUTES } from '../../router';
import { Item } from '../utils/Item/Item';
import { MdCancel } from 'react-icons/md';
import { List } from '../utils/List/List';
import styles from './AddItems.module.css';
import { HiDocument } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';
import { COLLECTIONS } from '../../types/collectionEnums';

import {
	useDeleteAllMutation,
	useGetAllProductsQuery,
	useMoveAllMutation,
} from '../../app/productsApi';

export const AddItems = () => {
	const navigate = useNavigate();

	const { data, isLoading } = useGetAllProductsQuery(
		COLLECTIONS.PRODUCTS_TO_BE_ADDED
	);

	const [deleteAll] = useDeleteAllMutation();
	const [moveAll] = useMoveAllMutation();

	const handleCancel = async () => {
		await deleteAll(COLLECTIONS.PRODUCTS_TO_BE_ADDED);
	};

	const handleSubmit = async () => {
		await moveAll({
			srcCollection: COLLECTIONS.PRODUCTS_TO_BE_ADDED,
			destCollection: COLLECTIONS.PRODUCTS_TO_BUY,
		});
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
					) : data && typeof data !== 'string' && data.length > 0 ? (
						data.map((product) => (
							<Item
								key={Math.random()}
								name={product.name}
								price={product.price}
								quantity={product.quantity}
								id={product.id}
								collectionName={
									COLLECTIONS.PRODUCTS_TO_BE_ADDED
								}
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
