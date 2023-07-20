import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../types/collectionEnums';

export const ItemCard = ({
	id,
	name,
	price,
	quantity,
	changeMode,
	collectionName,
	onDeleteHandler,
	handleCheckboxChange,
}: {
	id: string;
	name: string;
	price: string;
	quantity: string;
	collectionName: COLLECTIONS;
	changeMode: React.MouseEventHandler<HTMLButtonElement>;
	onDeleteHandler: React.MouseEventHandler<HTMLButtonElement>;
	handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<div className={styles.leftSide}>
				{collectionName !== COLLECTIONS.PRODUCTS_TO_BE_ADDED && (
					<input
						type="checkbox"
						id={`${name}-${quantity}-${price}-${id}`}
						defaultChecked={
							collectionName === COLLECTIONS.BOUGHT_PRODUCTS
						}
						onChange={handleCheckboxChange}
					/>
				)}
				<p>{name}</p>
				<p>Qty: {quantity}</p>
				<p>Price: ${price}</p>
			</div>
			<div className={styles.rightSide}>
				<Button icon={<LuEdit />} onClick={changeMode} />
				<Button icon={<RiDeleteBin7Line />} onClick={onDeleteHandler} />
			</div>
		</div>
	);
};
