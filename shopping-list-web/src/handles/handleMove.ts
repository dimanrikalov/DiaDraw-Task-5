import handleQuery from './handleQuery';
import handleCreate from './handleCreate';
import { deleteDoc } from '@firebase/firestore';
import { COLLECTIONS } from '../enums/collectionEnums';


const handleMove = (source: COLLECTIONS, destination: COLLECTIONS) => {
	try {
        
		handleQuery(source).then((querySnapshot) => {
			querySnapshot.forEach((x) => {
				handleCreate(x.data(), destination);
				deleteDoc(x.ref);
			});
		});
	} catch (err) {
		console.log(err);
	}
};

export default handleMove;
