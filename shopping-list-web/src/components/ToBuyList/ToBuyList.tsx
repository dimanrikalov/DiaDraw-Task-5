import { Item } from '../utils/Item/Item';
import styles from './ToBuyList.module.css';
import { RiEditCircleLine } from 'react-icons/ri';
import { AiOutlinePlus } from 'react-icons/ai';

export const ToBuyList = () => {
	return (
		<>
			<div className={styles.operations}>
				<button>
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
					<button>View bought items</button>
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
