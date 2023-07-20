import { ROUTES } from '../../router';
import { MdCancel } from 'react-icons/md';
import styles from './AddItems.module.css';
import { HiDocument } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircle } from 'react-icons/io';
import { Button } from '../utils/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';
import { ClickHandler } from '../utils/Item/ItemCard';

interface IAddItemsHeaderBody {
	handleSubmit: ClickHandler;
	handleCancel: ClickHandler;
}

export const AddItemsHeader = ({
	handleSubmit,
	handleCancel,
}: IAddItemsHeaderBody) => {
	const navigate = useNavigate();
	return (
		<div className={styles.titleDiv}>
			<h4>Items to add</h4>
			<div className={styles.operationsContainer}>
				<Button
					icon={<HiDocument />}
					onClick={() => navigate(ROUTES.CREATE_ITEM)}
				/>
				<Button icon={<IoIosAddCircle />} onClick={handleSubmit} />
				<Button icon={<MdCancel />} onClick={handleCancel} />
			</div>
			<Button
				icon={<IoChevronBackCircle />}
				onClick={() => navigate(ROUTES.HOME)}
			/>
		</div>
	);
};
