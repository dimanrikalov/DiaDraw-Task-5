import { useNavigate } from 'react-router-dom';
import { List } from '../utils/List/List';
import { Item } from '../utils/Item/Item';
import styles from './AddItems.module.css';
import { HiDocument } from 'react-icons/hi';
import { ROUTES } from '../../router';
import { MdCancel } from 'react-icons/md';
import { IoIosAddCircle } from 'react-icons/io';
import { IoChevronBackCircle } from 'react-icons/io5';

export const AddItems = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.listContainer}>
				<div className={styles.titleDiv}>
					<h4>Bought items</h4>
					<div className={styles.operationsContainer}>
						<button>
							<HiDocument />
						</button>
						<button>
							<IoIosAddCircle />
						</button>
						<button>
							<MdCancel />
						</button>
					</div>
					<button onClick={()=>navigate(ROUTES.HOME)}>
						<IoChevronBackCircle />
					</button>
				</div>
				<List>
					<Item />
				</List>
			</div>
		</div>
	);
};
