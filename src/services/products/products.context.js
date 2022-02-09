import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState([]);
	const [products, setProducts] = useState(null);
	const [orderList, setOrderList] = useState(null);

	useEffect(() => {
		let dataFetching = true;

		if (dataFetching) {
			firestoreUtils
				.fetchCollection("order-list")
				.then((data) => {
					setIsLoading(true);
					setOrderList(data);
					setError(null);
				})
				.then(() => {
					firestoreUtils.fetchCollection("product-list").then((data) => {
						setProducts(sortData(objToArr(data)));

						setError(null);
						setIsLoading(false);
					});
				})
				.catch((err) => {
					setError(err);
					setIsLoading(false);
				});
		}

		return () => {
			dataFetching = false;
			setIsLoading(false);
		};
	}, []);

	const onDeleteProduct = async (id) => {
		try {
			firestoreUtils.deleteData("product-list", id).then(() => {
				setIsLoading(true);
				setError(null);
				setIsLoading(false);
			});
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}
	};

	const onUpdateProduct = (id, data) => {
		firestoreUtils
			.updateData("product-list", id, data)
			.then(() => {
				setIsLoading(true);
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	const onAddNewProduct = (id, data) => {
		firestoreUtils
			.addData("product-list", id, data)
			.then(() => {
				setIsLoading(true);
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	const onAddToOrder = (id, data) => {
		firestoreUtils
			.addData("order-sheet", id, data)
			.then(() => {
				setIsLoading(true);
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	return (
		<ProductsContext.Provider
			value={{
				isLoading,
				error,
				products,
				orderList,
				setOrderList,
				setProducts,
				onDeleteProduct,
				onUpdateProduct,
				onAddNewProduct,
				onAddToOrder,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};
