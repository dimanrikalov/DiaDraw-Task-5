import styles from './Form.module.css';
import { Input, InputTypes } from '../Input/Input';

export const Form = () => {
	return (
		<form className={styles.form}>
			<Input inputType={InputTypes.NAME_INPUT} />
			<Input inputType={InputTypes.PRICE_INPUT} />
			<button>Add item</button>
		</form>
	);
};
