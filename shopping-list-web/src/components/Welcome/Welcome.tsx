import { ROUTES } from '../../router';
import styles from './Welcome.module.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInAnonymously } from 'firebase/auth';

export const Welcome = () => {
	const navigate = useNavigate();

	const loginAnonymously = () => {
		const auth = getAuth();
		signInAnonymously(auth).then(() => navigate(ROUTES.HOME));
	};

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

				<p>OR</p>
				<button className={styles.signBtn} onClick={loginAnonymously}>
					Sign as Guest
				</button>
			</div>
		</div>
	);
};
