import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';

export interface ItemInterface {
	name: string;
	quantity: number,
	price: number
}

export const Item = ({name, quantity, price}: ItemInterface) => {
	const handleEdit = () => {};

	const handleDelete = () => {};

	return (
		<div className={styles.cardBackground}>
			<p>{name}</p>
			<p>Qty: {quantity}</p>
			<p>Price: ${price}</p>
			<Button icon={<LuEdit />} onClick={handleEdit} />
			<Button icon={<RiDeleteBin7Line />} onClick={handleDelete} />
		</div>
	);
};
