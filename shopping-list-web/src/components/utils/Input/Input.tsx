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

interface IInputBody {
	type: Type;
	value: string;
	label?: string;
	placeholder: string;
	elementId: InputTypes;
	setInputs: React.ChangeEventHandler;
}

export const Input = ({
	type,
	value,
	label,
	elementId,
	setInputs,
	placeholder,
}: IInputBody) => {
	return (
		<div className={styles.inputContainer}>
			{label && <label htmlFor={elementId}>{label}</label>}
			<input
				type={type}
				value={value}
				id={elementId}
				onChange={setInputs}
				placeholder={placeholder}
			/>
		</div>
	);
};
