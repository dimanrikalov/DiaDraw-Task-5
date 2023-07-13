import styles from './AddItems.module.css';
import { Item } from '../utils/Item/Item';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Router';

export const AddItems = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className={styles.titleDiv}>
				<h2>Add items to the list</h2>
				<button onClick={()=>navigate(ROUTES.HOME)}>View to-buy list</button>
			</div>
			<div className={styles.listContainer}>
				<ul>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li><li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
					<li>
						<Item />
					</li>
				</ul>
			</div>

			<ul className={styles.operations}>
				<li>
					<button onClick={()=>navigate(ROUTES.CREATE_ITEM)}>Create new product</button>
				</li>
				<li>
					<button>Add</button>
				</li>
				<li>
					<button>Cancel</button>
				</li>
			</ul>
		</>
	);
};
