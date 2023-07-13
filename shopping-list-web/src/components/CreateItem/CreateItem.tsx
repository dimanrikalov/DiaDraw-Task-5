import { Form } from '../utils/Form/Form';
import styles from './CreateItem.module.css';

export const CreateItem = () => {
	return (
		<div className={styles.container}>
			<h3 style={{alignSelf: 'center'}}>Add new item</h3>
			<Form />
		</div>
	);
};
