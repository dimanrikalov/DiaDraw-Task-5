import styles from './Item.module.css';
import { Button } from '../Button/Button';
import { LuEdit } from 'react-icons/lu';
import { RiDeleteBin7Line } from 'react-icons/ri';

export const Item = () => {
	const handleEdit = () => {};

	const handleDelete = () => {};

	return (
		<div className={styles.cardBackground}>
			<p>Banana</p>
			<p>Qty: 2</p>
			<p>Price: $3.50</p>
			<Button icon={<LuEdit />} onClick={handleEdit} />
			<Button icon={<RiDeleteBin7Line />} onClick={handleDelete} />
		</div>
	);
};
