import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
	const [products, setProducts] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [keyword, setKeyword] = useState("");

	const onSearchProducts = (word) => {
		setIsLoading(true);
		setKeyword(word);
	};

	useEffect(() => {
		const subscriber = firestore()
			.collection("product-list")
			.onSnapshot((querySnapshot) => {
				setIsLoading(true);

				const dataObj = Object.create({});

				querySnapshot.forEach((documentSnapshot) => {
					const { id } = documentSnapshot.data();

					dataObj[id] = {
						...documentSnapshot.data(),
						key: id,
					};
				});

				let productsArr = sortData(objToArr(dataObj));

				if (keyword !== "") {
					const searchData1 = productsArr.filter((product) => {
						return product.name.toLowerCase().includes(keyword.toLowerCase());
					});

					const searchData2 = productsArr.filter((product) => {
						return product.desc.toLowerCase().includes(keyword.toLowerCase());
					});

					const searchData = [...searchData1, ...searchData2].filter(
						(x, i, a) => a.indexOf(x) === i
					);

					productsArr = searchData;
				}

				setProducts(productsArr);
				setError(null);
				setIsLoading(false);
			});

		return () => {
			subscriber();
			setIsLoading(false);
		};
	}, [keyword]);

	const onDeleteProduct = async (id) => {
		try {
			setIsLoading(true);

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
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onAddNewProduct = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.addData("product-list", id, data)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	function fetchProducts() {
		setIsRefreshing(true);

		firestore()
			.collection("product-list")
			.get()
			.then((data) => {
				const dataObj = Object.create({});

				data.docs.map((doc) => {
					const { id } = doc.data();

					dataObj[id] = {
						...doc.data(),
						key: id,
					};

					setProducts(sortData(objToArr(dataObj)));
					setIsRefreshing(false);
				});
			});
	}

	return (
		<ProductsContext.Provider
			value={{
				products,
				isRefreshing,
				error,
				isLoading,
				setKeyword,
				setIsLoading,
				setError,
				onDeleteProduct,
				onUpdateProduct,
				onAddNewProduct,
				fetchProducts,
				search: onSearchProducts,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};
