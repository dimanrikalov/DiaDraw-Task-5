import styles from './AddItems.module.css';
import { Item } from '../utils/Item/Item';

export const AddItems = () => {
	return (
		<>
			<div className={styles.titleDiv}>
				<h2>Add items to the list</h2>
				<button>View bought items</button>
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
					<button>Create new product</button>
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
