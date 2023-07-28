import {
	COLLECTIONS,
	useDeleteProductMutation,
} from '../../../app/productsApi';
import { useState } from 'react';
import { ItemCard } from './ItemCard';
import { EditItemCard } from './EditItemCard';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../../firebase_setup/firebase';

export interface ItemInterface {
	id: string;
	name: string;
	price: number;
	quantity: number;
	creatorId: string;
	imageUrl: string;
	collectionName: COLLECTIONS;
}

export const Item = ({
	id,
	name,
	price,
	quantity,
	imageUrl,
	creatorId,
	collectionName,
}: ItemInterface) => {
	const [deleteProduct] = useDeleteProductMutation();
	const [isInEditMode, setIsInEditMode] = useState(false);
	const [inputValues, setInputValues] = useState({
		name: '',
		price: '',
		quantity: '',
	});

	const onDeleteHandler = async () => {
		const hasConfirmed = window.confirm(
			`Are you sure you want to delete "${name}" from the list?`
		);

		if (!hasConfirmed) {
			return;
		}

		const currImageRef = ref(storage, imageUrl);
		await deleteObject(currImageRef);

		deleteProduct({ collectionName, id });
	};

	const changeMode = () => {
		setInputValues({
			name: name,
			price: price.toString(),
			quantity: quantity.toString(),
		});
		setIsInEditMode(true);
	};

	return isInEditMode ? (
		<EditItemCard
			data={{
				id,
				name,
				price: price.toString(),
				quantity: quantity.toString(),
				creatorId,
				imageUrl,
			}}
			inputValues={inputValues}
			collectionName={collectionName}
			setInputValues={setInputValues}
			setIsInEditMode={setIsInEditMode}
		/>
	) : (
		<ItemCard
			id={id}
			productData={{
				id,
				name,
				price: price.toString(),
				quantity: quantity.toString(),
				creatorId: creatorId,
				imageUrl: imageUrl,
			}}
			changeMode={changeMode}
			collectionName={collectionName}
			onDeleteHandler={onDeleteHandler}
		/>
	);
};
