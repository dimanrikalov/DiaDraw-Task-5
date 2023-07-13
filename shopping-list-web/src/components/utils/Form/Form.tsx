import styles from './Form.module.css';
import { Button } from '../Button/Button';
import { Input, InputTypes, Type } from '../Input/Input';

export const Form = () => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<Input inputType={InputTypes.NAME_INPUT} label={'Enter item'} placeholder={'Milkshake'} type={Type.TEXT}/>
			<Input inputType={InputTypes.QUANTITY_INPUT} label={'Enter quantity'} placeholder={'2'} type={Type.NUMBER}/>
			<Input inputType={InputTypes.PRICE_INPUT} label={'Enter price'} placeholder={'$2.50'} type={Type.TEXT}/>
			<Button text={'Add item'} />
		</form>
	);
};
