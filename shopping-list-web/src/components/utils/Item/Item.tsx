import { useState } from 'react';
import { ItemCard } from './ItemCard';
import { EditItem } from './EditItemCard';
import { COLLECTIONS } from '../../../types/collectionEnums';
import { useDeleteProductMutation } from '../../../app/productsApi';

export interface ItemInterface {
	id: string;
	name: string;
	price: number;
	quantity: number;
	collectionName: COLLECTIONS;
}

export const Item = ({
	id,
	name,
	price,
	quantity,
	collectionName,
}: ItemInterface) => {
	const [deleteProduct] = useDeleteProductMutation();
	const [isInEditMode, setIsInEditMode] = useState(false);
	const [inputValues, setInputValues] = useState({
		name: '',
		price: '',
		quantity: '',
	});

	const onDeleteHandler = () => {
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
		<EditItem
			id={id}
			inputValues={inputValues}
			collectionName={collectionName}
			setInputValues={setInputValues}
			setIsInEditMode={setIsInEditMode}
		/>
	) : (
		<ItemCard
			id={id}
			productData={{
				name,
				price: price.toString(),
				quantity: quantity.toString(),
			}}
			changeMode={changeMode}
			collectionName={collectionName}
			onDeleteHandler={onDeleteHandler}
		/>
	);
};
