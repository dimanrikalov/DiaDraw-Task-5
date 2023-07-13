import { ROUTES } from '../../Router';
import { Item } from '../utils/Item/Item';
import { List } from '../utils/List/List';
import styles from './ToBuyList.module.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Button } from '../utils/Button/Button';
import { RiEditCircleLine } from 'react-icons/ri';

export const ToBuyList = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className={styles.operations}>
				<Button
					icon={<AiOutlinePlus />}
					text={'Add'}
					onClick={() => navigate(ROUTES.ADD_ITEM)}
				/>
				<Button
					icon={<RiEditCircleLine />}
					text={'Edit'}
					onClick={() => {}}
				/>
			</div>

			<div className={styles.listsContainer}>
				<div className={styles.listContainer}>
					<h1>To buy</h1>
					<List>
						<Item />
						<Item />
					</List>
				</div>
				<div className={styles.listContainer}>
					<h1>Already bought</h1>
					<List>
						<Item />
						<Item />
					</List>
				</div>
			</div>
		</>
	);
};
