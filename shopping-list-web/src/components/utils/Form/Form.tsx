import styles from './Form.module.css';
import { Button } from '../Button/Button';
import { Input, InputTypes } from '../Input/Input';

export const Form = () => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('submiteed');
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input inputType={InputTypes.NAME_INPUT} />
			<Input inputType={InputTypes.PRICE_INPUT} />
			<Button text={'Add item'} />
		</form>
	);
};
