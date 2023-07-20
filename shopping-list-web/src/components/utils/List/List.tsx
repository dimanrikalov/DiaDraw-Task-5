import styles from './List.module.css';

type Children = React.ReactElement[] | React.ReactElement | undefined;

export const List = ({ children }: { children: Children }) => {
	return <ul className={styles.list}>{children}</ul>;
};
