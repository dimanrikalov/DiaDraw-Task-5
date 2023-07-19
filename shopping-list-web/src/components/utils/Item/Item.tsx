import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../types/collectionEnums';
import {
	useDeleteProductMutation,
	useMoveProductMutation,
} from '../../../app/productsApi';

export interface ItemInterface {
	name: string;
	quantity: number;
	price: number;
	id: string;
	collectionName: COLLECTIONS;
}

export const Item = ({
	name,
	quantity,
	price,
	id,
	collectionName,
}: ItemInterface) => {
	const [deleteProduct] = useDeleteProductMutation();
	const [moveProduct] = useMoveProductMutation();

	const onEditHandler = () => {};

	const onDeleteHandler = () => {
		deleteProduct({ collectionName, id });
	};

	const handleChange = async () => {
		await moveProduct({ collectionName, id });
	};

	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<div className={styles.leftSide}>
				<input
					type="checkbox"
					id={`${name}-${quantity}-${price}-${id}`}
					defaultChecked={
						collectionName === COLLECTIONS.BOUGHT_PRODUCTS
					}
					onChange={handleChange}
				/>
				<p>{name}</p>
				<p>Qty: {quantity}</p>
				<p>Price: ${price}</p>
			</div>
			<div className={styles.rightSide}>
				<Button icon={<LuEdit />} onClick={onEditHandler} />
				<Button icon={<RiDeleteBin7Line />} onClick={onDeleteHandler} />
			</div>
		</div>
	);
};
