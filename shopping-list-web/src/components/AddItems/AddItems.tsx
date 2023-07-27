import {
	COLLECTIONS,
	useMoveAllMutation,
	useDeleteAllMutation,
	useGetAllProductsQuery,
} from '../../app/productsApi';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './AddItems.module.css';
import { AddItemsHeader } from './AddItemsHeader';
import { useGetUserQuery } from '../../app/userApi';

export const AddItems = () => {
	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();

	const { data, isLoading } = useGetAllProductsQuery(
		{
			creatorId: userData!.uid,
			collection: COLLECTIONS.PRODUCTS_TO_BE_ADDED,
		},
		{ skip: !userData }
	);

	const [moveAll] = useMoveAllMutation();
	const [deleteAll] = useDeleteAllMutation();

	const handleCancel = async () => {
		await deleteAll(COLLECTIONS.PRODUCTS_TO_BE_ADDED);
	};

	const handleSubmit = async () => {
		await moveAll({
			srcCollection: COLLECTIONS.PRODUCTS_TO_BE_ADDED,
			destCollection: COLLECTIONS.PRODUCTS_TO_BUY,
		});
	};

	if (isLoadingUser || isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.listContainer}>
				<AddItemsHeader
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
				/>
				<List>
					{data && typeof data !== 'string' && data.length > 0 ? (
						data.map((product) => (
							<Item
								creatorId={product.creatorId}
								imageUrl={product.imageUrl}
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
