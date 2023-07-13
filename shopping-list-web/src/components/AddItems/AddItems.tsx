import styles from './AddItems.module.css';
import { Item } from '../utils/Item/Item';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router';
import { Button } from '../utils/Button/Button';
import { List } from '../utils/List/List';

export const AddItems = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.addItemsContainer}>
			<div className={styles.titleDiv}>
				<h2>Add items to the list</h2>
				<Button
					text={'View to-buy list'}
					onClick={() => navigate(ROUTES.HOME)}
				/>
			</div>
			<div className={styles.listContainer}>
				<List>
					<Item />
					<Item />
				</List>
			</div>

			<div className={styles.operations}>
				<Button
					text={'Create new product'}
					onClick={() => navigate(ROUTES.CREATE_ITEM)}
				/>

				<Button text={'Add'} onClick={() => {}} />

				<Button text={'Cancel'} onClick={() => {}} />
			</div>
		</div>
	);
};
