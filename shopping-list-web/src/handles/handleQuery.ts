import { firestore } from "../firebase_setup/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const handleQuery = async () => {
    const q = query(collection(firestore, 'products'));
    const querySnapshot = await getDocs(q);
    return querySnapshot
}

export default handleQuery;