import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../types/collectionEnums';
import {
	deleteProductById,
	moveById,
} from '../../../utils/firestore-operations';
import { useState } from 'react';
import { useDeleteByRefMutation } from '../../../app/productsApi';
import { DocumentReference } from 'firebase/firestore';

export interface ItemInterface {
	name: string;
	quantity: number;
	price: number;
	refHandle: DocumentReference;
}

export const Item = ({
	name,
	quantity,
	price,
	refHandle,
}: ItemInterface) => {
	const [isChecked, setIsChecked] = useState(0);
	const [deleteByRef] = useDeleteByRefMutation();
	const onEditHandler = () => {};

	const onDeleteHandler = () => {
		deleteByRef(refHandle);
	};

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		// setIsChecked((prev) => Number(!prev));

		// if (collection === COLLECTIONS.PRODUCTS_TO_BUY) {
		// 	await moveById(id, collection, COLLECTIONS.BOUGHT_PRODUCTS);
		// 	return;
		// }
		// await moveById(id, collection, COLLECTIONS.PRODUCTS_TO_BUY);
	};

	return (
		<div className={styles.cardBackground}>
			<div className={styles.leftSide}>
				<input
					type="checkbox"
					id={`${name}-${quantity}-${price}-${refHandle}`}
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
