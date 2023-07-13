import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { RiEditCircleLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Router';

export const ToBuyList = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className={styles.operations}>
				<button onClick={()=>navigate(ROUTES.ADD_ITEM)}>
					<AiOutlinePlus />
					Add
				</button>
				<button>
					<RiEditCircleLine />
					Edit
				</button>
			</div>
			<div className={styles.listContainer}>
				<div className={styles.titleDiv}>
					<h2>Items to buy</h2>
					<button onClick={()=>navigate(ROUTES.ALREADY_BOUGHT_ITEMS)}>View bought items</button>
				</div>
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
					</li>
					<li>
						<Item />
					</li>
				</ul>
			</div>
		</>
	);
};
