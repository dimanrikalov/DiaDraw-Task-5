import handleQuery from './handleQuery';
import { deleteDoc } from '@firebase/firestore';
import { COLLECTIONS } from '../enums/collectionEnums';

const handleDelete = (collectionToModify: COLLECTIONS) => {
	try {
		handleQuery(collectionToModify).then((querySnapshot) => {
			querySnapshot.forEach((x) => {
				deleteDoc(x.ref);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

export default handleDelete;
