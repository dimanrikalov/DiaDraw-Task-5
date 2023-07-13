import { Router } from './router';
import styles from './App.module.css';
import { BrowserRouter } from 'react-router-dom';
import { Wrapper } from './components/utils/Wrapper/Wrapper';

function App() {
	return (
		<div className={styles.container}>
			<Wrapper>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Wrapper>
		</div>
	);
}

export default App;
