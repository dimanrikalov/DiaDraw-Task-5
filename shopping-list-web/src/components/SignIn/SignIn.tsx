import { MouseEvent, useState } from 'react';
import styles from '../SignUp/SignUp.module.css';
import { useNavigate } from 'react-router-dom';
import {
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { ROUTES } from '../../router';

export const SignIn = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
	});

	const submitHandler = (e: MouseEvent) => {
		e.preventDefault();
		if (!inputValues.email || !inputValues.password) {
			setError('Both fields are required!');
			return;
		}
		const auth = getAuth();
		signInWithEmailAndPassword(
			auth,
			inputValues.email,
			inputValues.password
		)
			.then(() => navigate(ROUTES.HOME))
			.catch((err: any) => {
				setError(err.message);
			});
	};

	return (
		<div className={styles.signUpContainer}>
			<h2>Sign-in</h2>
			{error && <p className={styles.errorMessage}>{error}</p>}
			<form className={styles.form}>
				<div className={styles.inputContainer}>
					<label htmlFor="email">Enter your email:</label>
					<input
						type="email"
						id="email"
						onChange={(e) =>
							setInputValues((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
				</div>
				<div className={styles.inputContainer}>
					<label htmlFor="password">Enter your password:</label>
					<input
						type="password"
						id="password"
						onChange={(e) =>
							setInputValues((prev) => ({
								...prev,
								password: e.target.value,
							}))
						}
					/>
				</div>
				<button className={styles.btn} onClick={submitHandler}>
					Sign-in
				</button>
			</form>
		</div>
	);
};
