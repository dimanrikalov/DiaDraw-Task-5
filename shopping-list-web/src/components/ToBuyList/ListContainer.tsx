import { Item } from '../utils/Item/Item';
import { List } from '../utils/List/List';
import styles from './ToBuyList.module.css';
import { IProduct, COLLECTIONS } from '../../app/productsApi';
import { useTranslation } from 'react-i18next';

export const ListContainer = ({
	header,
	products,
	isLoading,
	collectionName,
}: {
	header: string;
	isLoading: boolean;
	collectionName: COLLECTIONS;
	products: IProduct[] | undefined | string;
}) => {
	const { t } = useTranslation();
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
								id={product.id}
								key={Math.random()}
								name={product.name}
								price={product.price}
								quantity={product.quantity}
								imageUrl={product.imageUrl}
								creatorId={product.creatorId}
								collectionName={collectionName}
							/>
						))
					) : (
						<h4>{t('list_is_empty', {percent: 32})}</h4>
					)}
				</List>
			</div>
		</div>
	);
};
