import { ROUTES } from '../../router';
import { Form } from '../utils/Form/Form';
import styles from './CreateItem.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '../utils/Button/Button';
import { IoChevronBackCircle } from 'react-icons/io5';

export const CreateItem = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.titleDiv}>
				<h4 style={{ alignSelf: 'center' }}>Add new item</h4>
				<Button
					icon={<IoChevronBackCircle />}
					onClick={() => navigate(ROUTES.HOME)}
				/>
			</div>
			<Form />
		</div>
	);
};
