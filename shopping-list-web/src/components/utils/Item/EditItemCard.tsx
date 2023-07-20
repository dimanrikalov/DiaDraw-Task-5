import styles from './Item.module.css';
import { Button } from '../Button/Button';
import { Input, InputTypes, Type } from '../Input/Input';
import { IProductData, PRODUCT_DATA_KEYS } from './ItemCard';
import { COLLECTIONS } from '../../../types/collectionEnums';
import { useEditProductMutation } from '../../../app/productsApi';

interface IEditItemBody {
	id: string;
	inputValues: IProductData;
	collectionName: COLLECTIONS;
	setIsInEditMode: React.Dispatch<React.SetStateAction<boolean>>;
	setInputValues: React.Dispatch<React.SetStateAction<IProductData>>;
}

export const EditItem = ({
	id,
	inputValues,
	collectionName,
	setInputValues,
	setIsInEditMode,
}: IEditItemBody) => {
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

	const setInput = (e: React.BaseSyntheticEvent, key: PRODUCT_DATA_KEYS) => {
		setInputValues((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<div className={styles.editContainer}>
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
					elementId={InputTypes.NAME_INPUT}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInput(e, PRODUCT_DATA_KEYS.QUANTITY)
					}
				/>
				<Input
					type={Type.TEXT}
					placeholder="Price"
					value={inputValues.price}
					elementId={InputTypes.NAME_INPUT}
					setInputs={(e: React.BaseSyntheticEvent) =>
						setInput(e, PRODUCT_DATA_KEYS.PRICE)
					}
				/>
				<Button text={'Edit'} onClick={onEditHandler} />
			</div>
		</div>
	);
};
