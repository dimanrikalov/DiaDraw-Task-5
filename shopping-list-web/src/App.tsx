import { Router } from './router';
import styles from './App.module.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<div className={styles.container}>
			<BrowserRouter>
				<Router />
			</BrowserRouter>
		</div>
	);
}

export default App;
