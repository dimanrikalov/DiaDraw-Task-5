import styles from './Item.module.css';
import { Button } from '../Button/Button';
import { MdEditSquare, MdRemoveCircle } from 'react-icons/md';

export const Item = () => {
	const handleEdit = () => {};

	const handleDelete = () => {};

	return (
		<li>
			<div className={styles.cardBackground}>
				<div className={styles.leftSide}>
					<h2>Milkshake</h2>
					<h3>$3.50</h3>
				</div>
				<div className={styles.rightSide}>
					<Button
						icon={<MdEditSquare color={'#00acee'} size={28} />}
						text={''}
						onClick={handleEdit}
					/>
					<Button
						icon={<MdRemoveCircle color={'#00acee'} size={28} />}
						text={''}
						onClick={handleDelete}
					/>
				</div>
			</div>
		</li>
	);
};
