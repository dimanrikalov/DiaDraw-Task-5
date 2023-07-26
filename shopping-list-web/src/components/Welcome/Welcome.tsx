import { ROUTES } from '../../router';
import styles from './Welcome.module.css';
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
	const navigate = useNavigate();
	
	return (
		<div className={styles.welcomeContainer}>
			<h1>Welcome!</h1>
			<h3>Please sign-in or sign-up</h3>

			<div className={styles.btnContainer}>
				<button
					className={styles.signBtn}
					onClick={() => navigate(ROUTES.SIGN_IN)}
				>
					Sign-in
				</button>

				<p>Don't have an account?</p>

				<button
					className={styles.signBtn}
					onClick={() => navigate(ROUTES.SIGN_UP)}
				>
					Sign-up
				</button>
			</div>
		</div>
	);
};
