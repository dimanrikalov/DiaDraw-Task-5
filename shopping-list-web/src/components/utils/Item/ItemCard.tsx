import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../types/collectionEnums';
import { useMoveProductMutation } from '../../../app/productsApi';

export type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;

export interface IProductData {
	name: string;
	price: string;
	quantity: string;
}

export enum PRODUCT_DATA_KEYS {
	NAME = 'name',
	PRICE = 'price',
	QUANTITY = 'quantity',
}

interface IItemCardBody {
	id: string;
	changeMode: ClickHandler;
	productData: IProductData;
	collectionName: COLLECTIONS;
	onDeleteHandler: ClickHandler;
}

export const ItemCard = ({
	id,
	changeMode,
	productData,
	collectionName,
	onDeleteHandler,
}: IItemCardBody) => {
	const [moveProduct] = useMoveProductMutation();
	const handleCheckboxChange = async () => {
		await moveProduct({ collectionName, id });
	};

	return (
		<div className={styles.cardBackground}>
			{collectionName === COLLECTIONS.BOUGHT_PRODUCTS && (
				<div className={styles.crossLine}></div>
			)}
			<div className={styles.leftSide}>
				{collectionName !== COLLECTIONS.PRODUCTS_TO_BE_ADDED && (
					<input
						type="checkbox"
						id={`${productData.name}-${productData.quantity}-${productData.price}-${id}`}
						defaultChecked={
							collectionName === COLLECTIONS.BOUGHT_PRODUCTS
						}
						onChange={handleCheckboxChange}
					/>
				)}
				<p>{productData.name}</p>
				<p>Qty: {productData.quantity}</p>
				<p>Price: ${productData.price}</p>
			</div>
			<div className={styles.rightSide}>
				<Button icon={<LuEdit />} onClick={changeMode} />
				<Button icon={<RiDeleteBin7Line />} onClick={onDeleteHandler} />
			</div>
		</div>
	);
};
