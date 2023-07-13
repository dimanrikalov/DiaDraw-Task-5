import styles from './Input.module.css';

export enum InputTypes {
	NAME_INPUT = 'name-input',
	PRICE_INPUT = 'price-input',
}

export const Input = ({ inputType }: { inputType: InputTypes }) => {
	if (inputType === InputTypes.NAME_INPUT) {
		return (
			<div className={styles.inputContainer}>
				<label htmlFor="name">Enter item name</label>
				<input id="name" type="text" placeholder="Milkshake" />
			</div>
		);
	}
	return (
		<div className={styles.inputContainer}>
			<label htmlFor="price">Enter item's price</label>
			<input id="price" type="text" placeholder="$3.60" />
		</div>
	);
};
