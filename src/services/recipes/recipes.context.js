import React, { createContext, useState, useEffect } from "react";

import { fetchRecipes } from "./recipes.service";

import { objToArr } from "../utils/objtoarr";

export const RecipesContext = createContext();

export const RecipesContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		let fetchingRecipes = true;

		setIsLoading(true);
		fetchRecipes().then((data) => {
			if (fetchingRecipes) {
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

	return (
		<RecipesContext.Provider
			value={{
				isLoading,
				error,
				recipes,
			}}
		>
			{children}
		</RecipesContext.Provider>
	);
};
