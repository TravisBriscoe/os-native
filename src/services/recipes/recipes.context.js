import React, { createContext, useState, useEffect } from "react";

import firestoreUtils from "../utils/firestoreUtils";
import { objToArr } from "../utils/objtoarr";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [recipeData, setRecipeData] = useState({ recipes: {} });

	useEffect(() => {
		let fetchingRecipes = true;

		if (fetchingRecipes) {
			setIsLoading(true);

			firestoreUtils.fetchCollection("recipe-list").then((data) => {
				setRecipeData({ recipes: { data } });
				setError(null);
				setIsLoading(false);
			});
		}

		return () => {
			fetchingRecipes = false;
			setError(null);
			setIsLoading(false);
		};
	}, [recipeData.data]);

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
				recipes: recipeData.recipes,
				setRecipeData,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
};
