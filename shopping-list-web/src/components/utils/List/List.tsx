import './List.module.css';

export const List = ({
	children,
}: {
	children: React.ReactElement[] | React.ReactElement;
}) => {
	return <ul>{children}</ul>;
};
