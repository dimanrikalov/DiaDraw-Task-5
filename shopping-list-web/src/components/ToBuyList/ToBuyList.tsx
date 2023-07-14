import { ROUTES } from '../../router';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { RiEditCircleFill } from 'react-icons/ri';

export const ToBuyList = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.operationsContainer}>
				<Button
					icon={<IoIosAddCircle />}
					onClick={() => navigate(ROUTES.ADD_ITEM)}
				/>
				<Button icon={<RiEditCircleFill />} />
			</div>
			<div className={styles.listsContainer}>
				<div className={styles.listContainer}>
					<h4>Items to buy</h4>
					<List>
						{/* <Item /> */}
					</List>
				</div>
				<div className={styles.listContainer}>
					<h4>Bought items</h4>
					<List>
						{/* <Item /> */}
					</List>
				</div>
			</div>
		</div>
	);
};
