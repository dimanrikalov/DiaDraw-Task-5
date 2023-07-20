import styles from './Item.module.css';
import { Button } from '../Button/Button';
import { Input, InputTypes, Type } from '../Input/Input';
import { COLLECTIONS } from '../../../types/collectionEnums';
import { useEditProductMutation } from '../../../app/productsApi';

export const EditItem = ({
	id,
	inputValues,
	collectionName,
	setInputValues,
	setIsInEditMode,
}: {
	id: string;
	collectionName: COLLECTIONS;
	inputValues: { name: string; quantity: string; price: string };
	setInputValues: React.Dispatch<
		React.SetStateAction<{ name: string; quantity: string; price: string }>
	>;
	setIsInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const [editProduct] = useEditProductMutation();

	const onEditHandler = async () => {
		await editProduct({
			collectionName,
			id,
			data: {
				name: inputValues.name,
				price: Number(inputValues.price),
				quantity: Number(inputValues.quantity),
			},
		});
		setIsInEditMode(false);
	};

	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<div className={styles.editContainer}>
				<Input
					inputType={InputTypes.NAME_INPUT}
					placeholder="Watermelon"
					type={Type.TEXT}
					value={inputValues.name}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInputValues((prev) => ({
							...prev,
							name: e.target.value,
						}))
					}
				/>
				<Input
					inputType={InputTypes.NAME_INPUT}
					placeholder="Quantity"
					type={Type.TEXT}
					value={inputValues.quantity}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInputValues((prev) => ({
							...prev,
							quantity: e.target.value,
						}))
					}
				/>
				<Input
					inputType={InputTypes.NAME_INPUT}
					placeholder="Price"
					type={Type.TEXT}
					value={inputValues.price}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInputValues((prev) => ({
							...prev,
							price: e.target.value,
						}))
					}
				/>
				<Button text={'Edit'} onClick={onEditHandler} />
			</div>
		</div>
	);
};
