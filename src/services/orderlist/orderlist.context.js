import React, { createContext, useState, useEffect, useContext } from "react";
import firestore from "@react-native-firebase/firestore";

import firestoreUtils from "../utils/firestoreUtils";
import { AppContext } from "../app/app.context";
import { objToArr } from "../utils/objtoarr";
import { sortOrderData } from "../utils/sortData";

export const OrderlistContext = createContext();

export const OrderlistContextProvider = ({ children }) => {
	const [orderlist, setOrderlist] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const orderlistCollection = firestore().collection("order-list");
	const { setIsLoading, setError } = useContext(AppContext);

	useEffect(() => {
		const subscriber = orderlistCollection.onSnapshot((querySnapshot) => {
			setIsLoading(true);

			const dataObj = Object.create({});

			querySnapshot.docs.map((doc) => {
				const { id } = doc.data();

				dataObj[id] = {
					...doc.data(),
					key: id,
				};
			});

			setOrderlist(sortOrderData(objToArr(dataObj)));
			setError(null);
			setIsLoading(false);
		});

		return () => {
			setIsLoading(false);
			setError(null);
			subscriber();
		};
	}, []);

	const onAddToOrder = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.addData("order-list", id, data)
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

	const fetchOrderlist = () => {
		setIsRefreshing(true);

		firestore()
			.collection("order-list")
			.get()
			.then((documentSnapshot) => {
				const dataObj = Object.create({});

				if (!documentSnapshot.docs.length) {
					return setIsRefreshing(false);
				}

				documentSnapshot.docs.map((doc) => {
					const { id } = doc.data();

					dataObj[id] = {
						...doc.data(),
						key: id,
					};

					setOrderlist(sortOrderData(objToArr(dataObj)));
					setIsRefreshing(false);
				});
			});
	};

	return (
		<OrderlistContext.Provider
			value={{
				isRefreshing,
				orderlist,
				onAddToOrder,
				onDeleteOrderlist,
				onRemoveFromOrder,
				onUpdateOrder,
				fetchOrderlist,
			}}
		>
			{children}
		</OrderlistContext.Provider>
	);
};
