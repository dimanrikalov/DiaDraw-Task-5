import { addDoc, collection } from '@firebase/firestore';
import { firestore } from '../firebase_setup/firebase';

const handleSubmit = (productData: any) => {
	const ref = collection(firestore, 'products'); // Firebase creates this automatically

	let data = {
		product: productData,
	};

	try {
		addDoc(ref, data);
	} catch (err) {
		console.log(err);
	}
};

export default handleSubmit;
