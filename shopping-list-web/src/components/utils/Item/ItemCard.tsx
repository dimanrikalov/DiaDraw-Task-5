import styles from './Item.module.css';
import { LuEdit } from 'react-icons/lu';
import { Button } from '../Button/Button';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../../app/store';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { COLLECTIONS } from '../../../app/productsApi';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebase_setup/firebase';
import { useMoveProductMutation } from '../../../app/productsApi';

export type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;

export interface IProductData {
	id: string;
	name: string;
	price: string;
	quantity: string;
	imageUrl: string;
	creatorId: string;
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
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {
		getDownloadURL(ref(storage, productData.imageUrl)).then((res) => {
			setImageUrl(res);
		});
	}, []);

	const shouldEdit = useSelector(
		(state: RootState) => state.editModeReducer.value
	);

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
				<img
					src={imageUrl}
					alt="item-img"
					className={styles.productImg}
				/>
				<p>{productData.name}</p>
				<p>Qty: {productData.quantity}</p>
				<p>Price: ${productData.price}</p>
			</div>
			{shouldEdit && (
				<div className={styles.rightSide}>
					<Button icon={<LuEdit />} onClick={changeMode} />
					<Button
						icon={<RiDeleteBin7Line />}
						onClick={onDeleteHandler}
					/>
				</div>
			)}
		</div>
	);
};
