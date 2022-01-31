import React, { createContext, useState, useEffect } from "react";

import { deleteProduct, fetchProducts } from "./products.service";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState([]);
	const [products, setProducts] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		fetchProducts().then((data) => {
			const newData = sortData(objToArr(data));

			setProducts(newData);
			setError(null);
			setIsLoading(false);
		});
	}, [products]);

	return (
		<ProductsContext.Provider value={{ products, isLoading, error, deleteProduct }}>
			{props.children}
		</ProductsContext.Provider>
	);
};
