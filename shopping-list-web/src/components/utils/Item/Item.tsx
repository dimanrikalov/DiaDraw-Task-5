import {
	useDeleteProductMutation,
	useMoveProductMutation,
} from '../../../app/productsApi';
import { useState } from 'react';
import { EditItem } from './EditItemCard';
import { ItemCard } from './ItemCard';
import { COLLECTIONS } from '../../../types/collectionEnums';

export interface ItemInterface {
	name: string;
	quantity: number;
	price: number;
	id: string;
	collectionName: COLLECTIONS;
}

export const Item = ({
	id,
	name,
	price,
	quantity,
	collectionName,
}: ItemInterface) => {
	const [moveProduct] = useMoveProductMutation();
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

	const handleCheckboxChange = async () => {
		await moveProduct({ collectionName, id });
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
			name={name}
			changeMode={changeMode}
			price={price.toString()}
			quantity={quantity.toString()}
			collectionName={collectionName}
			onDeleteHandler={onDeleteHandler}
			handleCheckboxChange={handleCheckboxChange}
		/>
	);
};
