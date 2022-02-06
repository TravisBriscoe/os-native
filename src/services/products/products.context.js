import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState([]);
	const [products, setProducts] = useState(null);

	useEffect(() => {
		let dataFetching = true;

		setIsLoading(true);
		firestoreUtils.fetchCollection("product-list").then((data) => {
			if (dataFetching) {
				const newData = sortData(objToArr(data));

				setProducts(newData);
				setError(null);
				setIsLoading(false);
			}
		});

		return () => {
			dataFetching = false;
		};
	}, [products]);

	const onDeleteProduct = async (id) => {
		setIsLoading(true);
		try {
			firestoreUtils.deleteData("product-list", id).then(() => {
				setError(null);
				setIsLoading(false);
			});
		} catch (err) {
			setError(err);
			setIsLoading(false);
		}
	};

	const onUpdateProduct = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.updateData("product-list", id, data)
			.then(() => {
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	const onAddNewProduct = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.addData("product-list", id, data)
			.then(() => {
				setIsLoading(false);
				setError(null);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
			});
	};

	return (
		<ProductsContext.Provider
			value={{ products, isLoading, error, onDeleteProduct, onUpdateProduct, onAddNewProduct }}
		>
			{children}
		</ProductsContext.Provider>
	);
};
