import styles from './List.module.css';

export const List = ({
	children,
}: {
	children: React.ReactElement[] | React.ReactElement | undefined;
}) => {
	return <ul className={styles.list}>{children}</ul>;
};
