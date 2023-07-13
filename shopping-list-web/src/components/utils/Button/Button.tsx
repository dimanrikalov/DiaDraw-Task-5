import styles from './Button.module.css';

interface ButtonProps {
	icon?: React.ReactElement;
	text?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
	return (
		<button
			className={styles.button}
			style={!props.text ? { padding: 0 } : {}}
			onClick={props.onClick}
		>
			{props.icon}
			{props.text}
		</button>
	);
};
