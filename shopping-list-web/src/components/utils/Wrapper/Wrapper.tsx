import styles from './Wrapper.module.css';

export const Wrapper = ({
	children,
}: {
	children: React.ReactElement[] | React.ReactElement;
}) => {
	return <div className={styles.container}>{children}</div>;
};
