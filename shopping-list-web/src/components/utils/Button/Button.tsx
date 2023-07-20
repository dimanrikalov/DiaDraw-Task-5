import styles from './Button.module.css';

interface ButtonInterface {
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface IconButtonInterface extends ButtonInterface {
	icon: React.ReactElement;
}

interface TextButtonInterface extends ButtonInterface {
	text: string;
}

export type ButtonProps = IconButtonInterface | TextButtonInterface;

export const Button = (props: ButtonProps) => {
	const className =
		'text' in props
			? styles.button
			: `${styles.button} ${styles.iconButton}`;
	const value = 'text' in props ? props.text : props.icon;

	return (
		<button className={className} onClick={props.onClick}>
			{value}
		</button>
	);
};
