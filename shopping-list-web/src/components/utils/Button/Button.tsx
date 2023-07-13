interface ButtonProps {
	icon?: React.ReactElement;
	text?: string;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = (props: ButtonProps) => {
	return (
		<button onClick={props.onClick}>
			{props.icon}
			{props.text}
		</button>
	);
};
