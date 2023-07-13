import { Form } from './components/utils/Form/Form';
import styles from './App.module.css';
import { AddItems } from './components/AddItems/AddItems';
import { ToBuyList } from './components/ToBuyList/ToBuyList';
import { Wrapper } from './components/utils/Wrapper/Wrapper';
import { CreateItem } from './components/CreateItem/CreateItem';

function App() {
	return (
		<div className={styles.container}>
			<Wrapper>
				<CreateItem />
			</Wrapper>
		</div>
	);
}

export default App;
