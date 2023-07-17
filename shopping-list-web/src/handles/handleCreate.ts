import { COLLECTIONS } from '../enums/collectionEnums';
import { firestore } from '../firebase_setup/firebase';
import { addDoc, collection } from '@firebase/firestore';

const handleCreate = (productData: any, collectionToModify: COLLECTIONS) => {
	console.log(collectionToModify);
	const ref = collection(firestore, collectionToModify); // Firebase creates this automatically


	try {
		addDoc(ref, productData);
	} catch (err) {
		console.log(err);
	}
};

export default handleCreate;
