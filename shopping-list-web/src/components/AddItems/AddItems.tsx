import { ROUTES } from '../../router';
import { MdCancel } from 'react-icons/md';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './AddItems.module.css';
import { HiDocument } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';

export const AddItems = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.listContainer}>
				<div className={styles.titleDiv}>
					<h4>Items to add</h4>
					<div className={styles.operationsContainer}>
						<Button
							icon={<HiDocument />}
							onClick={() => navigate(ROUTES.CREATE_ITEM)}
						/>
						<Button icon={<IoIosAddCircle />} />
						<Button icon={<MdCancel />} />
					</div>
					<Button
						icon={<IoChevronBackCircle />}
						onClick={() => navigate(ROUTES.HOME)}
					/>
				</div>
				<List>
					<Item />
				</List>
			</div>
		</div>
	);
};
