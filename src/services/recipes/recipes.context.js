import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		let fetchingRecipes = true;

		firestoreUtils.fetchCollection("recipe-list").then((data) => {
			if (fetchingRecipes) {
				setIsLoading(true);
				const newData = objToArr(data);

				setRecipes(newData);
				setError(null);
				setIsLoading(false);
			}
		});

		return () => {
			fetchingRecipes = false;
		};
	}, [recipes]);

	onDeleteRecipe = (id) => {
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

	return (
		<RecipesContext.Provider
			value={{
				isLoading,
				error,
				recipes,
				setRecipes,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
};
