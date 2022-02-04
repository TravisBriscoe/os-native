import React, { createContext, useState, useEffect } from "react";

import { deleteProduct, fetchProducts, updateProduct, addNewProduct } from "./products.service";
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
		fetchProducts().then((data) => {
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
			deleteProduct(id).then(() => {
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

		updateProduct(id, data)
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

		addNewProduct(id, data)
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
