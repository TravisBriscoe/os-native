import React, { createContext, useState, useEffect } from "react";

import { deleteProduct, fetchProducts } from "./products.service";
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
			const newData = sortData(objToArr(data));

			setProducts(newData);
			setError(null);
			setIsLoading(false);
		});

		return () => {
			dataFetching = false;
		};
	}, [products]);

	return (
		<ProductsContext.Provider value={{ products, isLoading, error, deleteProduct }}>
			{children}
		</ProductsContext.Provider>
	);
};
