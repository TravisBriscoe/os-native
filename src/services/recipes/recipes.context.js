import React, { createContext, useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
	const [recipes, setRecipes] = useState(null);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const subscriber = firestore()
			.collection("recipe-list")
			.onSnapshot((querySnapshot) => {
				setIsLoading(true);

				const dataObj = Object.create({});

				querySnapshot.docs.map((documentSnapshot) => {
					const { id } = documentSnapshot.data();

					dataObj[id] = {
						...documentSnapshot.data(),
						key: id,
					};
				});

				setRecipes(objToArr(dataObj));
				setError(null);
				setIsLoading(false);
			});

		return () => {
			setError(null);
			setIsLoading(false);
			subscriber();
		};
	}, []);

	const onDeleteRecipe = (id) => {
		setIsLoading(true);

		firestoreUtils
			.deleteData("recipe-list", id)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onUpdateRecipe = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.updateData("recipe-list", id, data)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const onSaveNewRecipe = (id, data) => {
		setIsLoading(true);

		firestoreUtils
			.addData("recipe-list", id, data)
			.then(() => {
				setError(null);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err);
				setIsLoading(false);
			});
	};

	const fetchRecipes = () => {
		setIsRefreshing(true);

		firestoreUtils
			.fetchCollection("recipe-list")
			.then((data) => {
				if (!data.length) {
					return setIsRefreshing(false);
				}

				const dataObj = Object.create({});

				data.docs.map((doc) => {
					const { id } = doc.data();

					dataObj[id] = {
						...doc.data(),
						key: id,
					};

					setRecipes(objToArr(dataObj));
				});
			})
			.then(() => {
				setError(null);
				setIsRefreshing(false);
			});
	};

	return (
		<RecipesContext.Provider
			value={{
				recipes,
				isRefreshing,
				isLoading,
				error,
				setIsLoading,
				setError,
				onDeleteRecipe,
				onUpdateRecipe,
				onSaveNewRecipe,
				fetchRecipes,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
};
