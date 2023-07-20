import { Item } from '../utils/Item/Item';
import { List } from '../utils/List/List';
import styles from './ToBuyList.module.css';
import { ProductEntry, COLLECTIONS } from '../../app/productsApi';

export const ListContainer = ({
	header,
	products,
	isLoading,
	collectionName,
}: {
	header: string;
	isLoading: boolean;
	collectionName: COLLECTIONS;
	products: ProductEntry[] | undefined | string;
}) => {
	return (
		<div className={styles.listsContainer}>
			<div className={styles.listContainer}>
				<h4>{header}</h4>
				<List>
					{isLoading === true ? (
						<h4>Loading...</h4>
					) : products &&
					  typeof products !== 'string' &&
					  products.length > 0 ? (
						products.map((product) => (
							<Item
								key={Math.random()}
								name={product.name}
								price={product.price}
								quantity={product.quantity}
								id={product.id}
								collectionName={collectionName}
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
