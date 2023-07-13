import { useNavigate } from 'react-router-dom';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { IoIosAddCircle } from 'react-icons/io';
import { RiEditCircleFill } from 'react-icons/ri';
import { ROUTES } from '../../router';

export const ToBuyList = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.operationsContainer}>
				<button onClick={()=>navigate(ROUTES.ADD_ITEM)}>
					<IoIosAddCircle />
				</button>
				<button>
					<RiEditCircleFill />
				</button>
			</div>
			<div className={styles.listsContainer}>
			<div className={styles.rightSide}>
				<h4>Items to buy</h4>
				<List>
					<Item />
				</List>
			</div>
			<div className={styles.rightSide}>
				<h4>Bought items</h4>
				<List>
					<Item />
				</List>
			</div>
			</div>
		</div>
	);
};
