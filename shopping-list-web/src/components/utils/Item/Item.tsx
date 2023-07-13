import styles from './Item.module.css';
import { MdEditSquare, MdRemoveCircle } from 'react-icons/md';

export const Item = () => {
	return (
		<div className={styles.cardBackground}>
			<div className={styles.leftSide}>
				<h4>Milkshake</h4>
				<h3>$3.50</h3>
			</div>
			<div className={styles.rightSide}>
				<button>
					{' '}
					<MdEditSquare color={'#00acee'} size={28} />
				</button>
				<button>
					{' '}
					<MdRemoveCircle color={'00acee'} size={28} />
				</button>
			</div>
		</div>
	);
};
