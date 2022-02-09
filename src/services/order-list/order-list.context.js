import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";

export const OrderListContext = createContext();

export const OrderListContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		let fetchingData = true;

		setIsLoading(true);
		firestoreUtils
			.fetchCollection("order-list")
			.then((data) => {
				if (fetchingData) {
					setOrderList(objToArr(data));
				}
			})
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});

		return () => {
			fetchingData = false;
		};
	}, [orderList]);

	const onAddToOrder = (id, data) => {
		setIsLoading(true);

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

	return (
		<OrderListContext.Provider value={{ error, isLoading, orderList, onAddToOrder }}>
			{children}
		</OrderListContext.Provider>
	);
};
