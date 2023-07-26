import styles from './SignUp.module.css';
import { MouseEvent, useState } from 'react';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router';

export const SignUp = () => {
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const [inputValues, setInputValues] = useState({
		email: '',
		username: '',
		password: '',
	});

	const submitHandler = (e: MouseEvent) => {
		e.preventDefault();
		setError('');

		console.log(inputValues);

		if (
			!inputValues.email ||
			!inputValues.username ||
			!inputValues.password
		) {
			setError('Both fields are required!');
			return;
		}
		//submit
		const auth = getAuth();
		createUserWithEmailAndPassword(
			auth,
			inputValues.email,
			inputValues.password
		)
			.then(async (userCredential) => {
				if (auth.currentUser) {
					await updateProfile(auth.currentUser, {
						displayName: inputValues.username,
					})
				}

				// localStorage.setItem('token', userCredential.user.refreshToken); //optional
			})
			.then(() => {
				signInWithEmailAndPassword(
					auth,
					inputValues.email,
					inputValues.password
				)
					.then(() => {
						'Logged in successfully!';
						navigate(ROUTES.HOME);
					})
					.catch((err: any) => setError(err.message));
			})
			.catch((err: any) => setError(err.message));
	};

	return (
		<div className={styles.signUpContainer}>
			<h2>Sign-up</h2>
			{error && <p className={styles.errorMessage}>{error}</p>}
			<form className={styles.form}>
				<div className={styles.inputContainer}>
					<label htmlFor="username">Enter username:</label>
					<input
						type="text"
						id="username"
						onChange={(e) =>
							setInputValues((prev) => ({
								...prev,
								username: e.target.value,
							}))
						}
					/>
				</div>
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
					Sign-up
				</button>
			</form>
		</div>
	);
};
