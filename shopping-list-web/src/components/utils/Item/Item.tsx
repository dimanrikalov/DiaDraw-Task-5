import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../enums/collectionEnums';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../app/store';
import { deleteProduct } from '../../../app/features/product/productSlice';

export interface ItemInterface {
	name: string;
	quantity: number;
	price: number;
}

export const Item = ({ name, quantity, price }: ItemInterface) => {
	const onEditHandler = () => {};
	const product = useSelector((state: RootState) => state.product.value);
	const dispatch = useDispatch();
	const onDeleteHandler = () => {
		// handleDelete(COLLECTIONS.PRODUCTS_TO_BUY);
		dispatch(deleteProduct());
	};

	return (
		<div className={styles.cardBackground}>
			<div className={styles.leftSide}>
				<input type="checkbox" id="item-check" />
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
