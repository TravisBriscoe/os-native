import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";
import { sortData } from "../utils/sortData";

export const ProductsContext = createContext();

export const ProductsContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [fetchedProducts, setFetchedProducts] = useState(false);
	const [fetchedOrderlist, setFetchedOrderlist] = useState(false);
	const [error, setError] = useState([]);
	const [products, setProducts] = useState(null);
	const [orderlist, setOrderlist] = useState(null);

	useEffect(() => {
		let dataFetching = true;

		if (dataFetching) {
			setIsLoading(true);

			firestoreUtils
				.fetchCollection("order-list")
				.then((data) => {
					setOrderlist(data);
					setError(null);
				})
				.then(() => {
					firestoreUtils.fetchCollection("product-list").then((data) => {
						const newData = sortData(objToArr(data));
						setProducts(newData);

						setError(null);
						setIsLoading(false);
					});
				})
				.catch((err) => {
					setError(err);
					setIsLoading(false);
				});
			setIsLoading(false);
		}

		return () => {
			dataFetching = false;
			setIsLoading(false);
		};
	}, []);

	useEffect(() => {
		let dataFetching = true;

		if (dataFetching) {
			firestoreUtils
				.fetchCollection("product-list")
				.then((data) => {
					setIsLoading(true);
					setProducts(sortData(objToArr(data)));
					setError(null);
					setIsLoading(false);
				})
				.catch((err) => {
					setError(err);
					setIsLoading(false);
				});
		}

		setFetchedProducts(false);

		return () => {
			dataFetching = false;
			setIsLoading(false);
		};
	}, [fetchedProducts]);

	useEffect(() => {
		let dataFetching = true;

		if (dataFetching) {
			firestoreUtils
				.fetchCollection("order-list")
				.then((data) => {
					setIsLoading(true);

					setOrderlist(data);

					setError(null);
					setIsLoading(false);
				})
				.catch((err) => {
					setError(err);
					setIsLoading(false);
				});

			setFetchedOrderlist(false);
		}

		return () => {
			dataFetching = false;
			setIsLoading(false);
		};
	}, [fetchedOrderlist]);

	const fetchProducts = async () => {
		setFetchedProducts(true);
	};

	const fetchOrderlist = async () => {
		setFetchedOrderlist(true);
	};

	const onDeleteProduct = async (id) => {
		setIsLoading(true);
		setFetchedProducts(true);

		try {
			setFetchedProducts(!fetchedProducts);
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
		setFetchedProducts(true);

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
		setFetchedProducts(true);

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

	const onAddToOrder = (id, data) => {
		setIsLoading(true);
		setFetchedProducts(true);

		firestoreUtils
			.addData("order-sheet", id, data)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onRemoveFromOrder = (id) => {
		setIsLoading(true);
		setFetchedOrderlist(true);

		firestoreUtils
			.deleteData("order-list", id)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onUpdateOrder = (id, value) => {
		setIsLoading(true);
		setFetchedOrderlist(true);

		firestoreUtils
			.updateData("order-list", id, value)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onDeleteOrderlist = (data) => {
		setIsLoading(true);
		setFetchedOrderlist(true);

		firestoreUtils
			.deleteOrderlist(data)
			.then(() => {
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
				setIsLoading,
				error,
				setError,
				products,
				orderlist,
				setOrderlist,
				setProducts,
				onDeleteProduct,
				onUpdateProduct,
				onAddNewProduct,
				onAddToOrder,
				onRemoveFromOrder,
				onUpdateOrder,
				onDeleteOrderlist,
				fetchProducts,
				fetchOrderlist,
			}}
		>
			{children}
		</ProductsContext.Provider>
	);
};
