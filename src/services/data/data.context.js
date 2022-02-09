import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [products, setProducts] = useState(null);
	const [recipes, setRecipes] = useState(null);
	const [orderList, setOrderList] = useState(null);

	useEffect(() => {
		let dataFetching = true;

		if (dataFetching) {
			firestoreUtils
				.fetchCollection("product-list")
				.then((data) => {
					setIsLoading(true);
					setError(null);
					setProducts(sortData(objToArr(data)));
				})
				.then(() => {
					firestoreUtils.fetchCollection("recipe-list").then((data) => {
						setError(null);
						setRecipes(objToArr(data));
					});
				})
				.then(() => {
					firestoreUtils.fetchCollection("order-list").then((data) => {
						setError(null);
						setOrderList(objToArr(data));
						setIsLoading(false);
					});
				})
				.catch((error) => {
					setIsLoading(false);
					setError(error);
					setIsLoading(false);
				});
		}

		return () => {
			dataFetching = false;
		};
	}, [products, orderList, recipes]);

	return (
		<DataContext.Provider value={{ isLoading, error, products, orderList, recipes }}>
			{children}
		</DataContext.Provider>
	);
};
