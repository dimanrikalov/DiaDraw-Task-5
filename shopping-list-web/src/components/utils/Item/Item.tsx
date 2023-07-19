import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../enums/collectionEnums';
import {
	deleteProductById,
	moveById,
} from '../../../utils/firestore-operations';
import { useState } from 'react';

export interface ItemInterface {
	name: string;
	quantity: number;
	price: number;
	id: string;
	collection: COLLECTIONS;
}

export const Item = ({
	name,
	quantity,
	price,
	id,
	collection,
}: ItemInterface) => {
	const [isChecked, setIsChecked] = useState(0);

	const onEditHandler = () => {};

	const onDeleteHandler = () => {
		deleteProductById(id, collection);
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsChecked((prev) => Number(!prev));

		if (collection === COLLECTIONS.PRODUCTS_TO_BUY) {
			await moveById(id, collection, COLLECTIONS.BOUGHT_PRODUCTS);
			return;
		}
		await moveById(id, collection, COLLECTIONS.PRODUCTS_TO_BUY);
	};

	return (
		<div className={styles.cardBackground}>
			<div className={styles.leftSide}>
				<input
					type="checkbox"
					id="item-check"
					value={isChecked}
					onChange={(e) => handleChange(e)}
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
