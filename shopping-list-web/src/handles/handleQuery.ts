import { firestore } from "../firebase_setup/firebase";
import { COLLECTIONS } from "../enums/collectionEnums";
import { collection, query, where, getDocs } from "firebase/firestore";

const handleQuery = async (collectionToQuery: COLLECTIONS) => {
    const q = query(collection(firestore, collectionToQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot
}

export default handleQuery;