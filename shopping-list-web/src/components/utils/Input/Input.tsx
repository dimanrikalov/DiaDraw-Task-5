import styles from './Input.module.css';

export enum InputTypes {
	NAME_INPUT = 'name-input',
	PRICE_INPUT = 'price-input',
	QUANTITY_INPUT = 'quantity-input',
}

export enum Type {
	TEXT = 'text',
	NUMBER = 'number',
}

export const Input = ({
	label,
	placeholder,
	type,
	inputType,
}: {
	label: string;
	placeholder: string;
	type: Type;
	inputType: InputTypes;
}) => {
	return (
		<div className={styles.inputContainer}>
			<label htmlFor={inputType}>{label}</label>
			<input id={inputType} type={type} placeholder={placeholder} />
		</div>
	);
};
