import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './Item.module.css';
import { Button } from '../Button/Button';
import { useGetUserQuery } from '../../../app/userApi';
import { Input, InputTypes, Type } from '../Input/Input';
import { storage } from '../../../firebase_setup/firebase';
import { IProductData, PRODUCT_DATA_KEYS } from './ItemCard';
import { deleteObject, ref, uploadBytes } from 'firebase/storage';
import { COLLECTIONS, useEditProductMutation } from '../../../app/productsApi';

interface IEditItemBody {
	data: IProductData;
	inputValues: IInputData;
	collectionName: COLLECTIONS;
	setIsInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValues: React.Dispatch<React.SetStateAction<IInputData>>;
}

interface IInputData {
	name: string;
	price: string;
	quantity: string;
}

export const EditItemCard = ({
	data,
	inputValues,
	collectionName,
	setInputValues,
	setIsInEditMode,
}: IEditItemBody) => {
	const [editProduct] = useEditProductMutation();
	const [imageUpload, setImageUpload] = useState<File>();
	const { data: userData, isLoading: userIsLoading } = useGetUserQuery();

	const onEditHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!userData || !('uid' in userData)) {
			return;
		}

		if (!imageUpload) {
			return;
		}

		const imgUrl = data.imageUrl;

		//add new image
		const imageRef = ref(
			storage,
			`product-images/${imageUpload.name + uuid()}`
		);
		const uploadResult = await uploadBytes(imageRef, imageUpload);

		await editProduct({
			collectionName,
			id: data.id,
			data: {
				creatorId: userData.uid,
				price: Number(inputValues.price),
				quantity: Number(inputValues.quantity),
				imageUrl: uploadResult.metadata.fullPath,
			},
		});

		//remove curr image
		const currImageRef = ref(storage, imgUrl);
		await deleteObject(currImageRef);

		setIsInEditMode(false);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImageUpload(e.target.files[0]);
		}
	};

	const setInput = (e: React.BaseSyntheticEvent, key: PRODUCT_DATA_KEYS) => {
		setInputValues((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	if (userIsLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<form className={styles.editContainer} onSubmit={onEditHandler}>
				<Input
					type={Type.TEXT}
					placeholder="Watermelon"
					value={inputValues.name}
					elementId={InputTypes.NAME_INPUT}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInput(e, PRODUCT_DATA_KEYS.NAME)
					}
				/>
				<Input
					type={Type.TEXT}
					placeholder="Quantity"
					value={inputValues.quantity}
					elementId={InputTypes.QUANTITY_INPUT}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInput(e, PRODUCT_DATA_KEYS.QUANTITY)
					}
				/>
				<Input
					type={Type.TEXT}
					placeholder="Price"
					value={inputValues.price}
					elementId={InputTypes.PRICE_INPUT}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInput(e, PRODUCT_DATA_KEYS.PRICE)
					}
				/>
				<input
					type="file"
					name="myImage"
					accept="image/png, image/gif, image/jpeg"
					onChange={handleFileChange}
				/>
				<Button text={'Edit'} />
			</form>
		</div>
	);
};
