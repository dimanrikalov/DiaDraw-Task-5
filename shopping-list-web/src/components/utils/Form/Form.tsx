import {
	COLLECTIONS,
	ICreateProduct,
	useCreateProductMutation,
} from '../../../app/productsApi';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import styles from './Form.module.css';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes } from 'firebase/storage';
import { useGetUserQuery } from '../../../app/userApi';
import { Input, InputTypes, Type } from '../Input/Input';
import { storage } from '../../../firebase_setup/firebase';

export const Form = () => {
	const navigate = useNavigate();
	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery();

	const [inputs, setInputs] = useState({
		name: '',
		price: '',
		quantity: '',
	});
	const [imageUpload, setImageUpload] = useState<File>();

	const [error, setError] = useState('');
	const [createProduct, { isLoading }] = useCreateProductMutation();

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
	
		if (!userData || !('uid' in userData)) {
			setError('You must be logged in to be able to create');
			return;
		}

		if (Object.values(inputs).some((x) => !!x === false)) {
			setError('All fields are required');
			return;
		}

		if (!imageUpload) {
			setError('Product image is required!');
			return;
		}

		const imageRef = ref(
			storage,
			`product-images/${imageUpload.name + uuid()}`
		);
		const uploadResult = await uploadBytes(imageRef, imageUpload);

		const payload: ICreateProduct = {
			name: inputs.name,
			quantity: Number(inputs.quantity),
			price: Number(inputs.price),
			imageUrl: uploadResult.metadata.fullPath,
			creatorId: userData.uid,
			collectionToModify: COLLECTIONS.PRODUCTS_TO_BE_ADDED,
		};

		await createProduct(payload);

		navigate(-1);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImageUpload(e.target.files[0]);
		}
	};

	if (isLoadingUser) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			{isLoading ? (
				<h4>Loading...</h4>
			) : (
				<form className={styles.form} onSubmit={onSubmitHandler}>
					{error && <h4>{error}</h4>}
					<Input
						elementId={InputTypes.NAME_INPUT}
						label={'Enter item'}
						placeholder={'Milkshake'}
						type={Type.TEXT}
						value={inputs.name}
						setInputs={(e: React.BaseSyntheticEvent) =>
							setInputs((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
					/>
					<Input
						elementId={InputTypes.QUANTITY_INPUT}
						label={'Enter quantity'}
						placeholder={'2'}
						type={Type.NUMBER}
						value={inputs.quantity}
						setInputs={(e: React.BaseSyntheticEvent) =>
							setInputs((prev) => ({
								...prev,
								quantity: e.target.value,
							}))
						}
					/>
					<Input
						elementId={InputTypes.PRICE_INPUT}
						label={'Enter price'}
						placeholder={'$2.50'}
						type={Type.TEXT}
						value={inputs.price}
						setInputs={(e: React.BaseSyntheticEvent) =>
							setInputs((prev) => ({
								...prev,
								price: e.target.value,
							}))
						}
					/>
					<input
						type="file"
						name="myImage"
						accept="image/png, image/gif, image/jpeg"
						onChange={handleFileChange}
					/>
					<Button text={'Add item'} />
				</form>
			)}
		</>
	);
};
