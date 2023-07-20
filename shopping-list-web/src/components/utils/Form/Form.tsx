import {
	COLLECTIONS,
	CreateProductBody,
	useCreateProductMutation,
} from '../../../app/productsApi';
import { useState } from 'react';
import styles from './Form.module.css';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { Input, InputTypes, Type } from '../Input/Input';

export const Form = () => {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		name: '',
		price: '',
		quantity: '',
	});

	const [error, setError] = useState('');
	const [createProduct, { isLoading }] = useCreateProductMutation();

	const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		if (Object.values(inputs).some((x) => !!x === false)) {
			setError('All fields are required');
			return;
		}
		const payload: CreateProductBody = {
			name: inputs.name,
			quantity: Number(inputs.quantity),
			price: Number(inputs.price),
			collectionToModify: COLLECTIONS.PRODUCTS_TO_BE_ADDED,
		};
		await createProduct(payload);

		navigate(-1);
	};

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
					<Button text={'Add item'} />
				</form>
			)}
		</>
	);
};
