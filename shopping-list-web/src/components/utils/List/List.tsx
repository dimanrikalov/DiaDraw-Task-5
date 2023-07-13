import styles from './List.module.css';

export const List = ({
	children,
}: {
	children: React.ReactElement[] | React.ReactElement;
}) => {
	return <ul className={styles.list}>{children}</ul>;
};
