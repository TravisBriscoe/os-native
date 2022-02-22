import React, { createContext, useState, useEffect, useContext } from "react";
import firestore from "@react-native-firebase/firestore";

import firestoreUtils from "../utils/firestoreUtils";
import { AppContext } from "../app/app.context";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
	const [products, setProducts] = useState({});
	const [orderlist, setOrderlist] = useState({});
	const [isRefreshing, setIsRefreshing] = useState(false);
	const { setIsLoading, setError } = useContext(AppContext);

	useEffect(() => {
		const subscriber = firestore()
			.collection("product-list")
			.onSnapshot((querySnapshot) => {
				const dataObj = Object.create({});

				querySnapshot.forEach((documentSnapshot) => {
					const { id } = documentSnapshot.data();

					dataObj[id] = {
						...documentSnapshot.data(),
						key: id,
					};
				});

				setProducts(sortData(objToArr(dataObj)));
				setError(null);
				setIsLoading(false);
			});

		return () => {
			subscriber();
		};
	}, []);

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
				setError(null);
				setIsLoading(false);
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
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err);
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
				onDeleteProduct,
				onUpdateProduct,
				onAddNewProduct,
				fetchProducts,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};
