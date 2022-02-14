import React, { useState, useContext } from "react";

import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { RecipesContext } from "../../../services/recipes/recipes.context";

export const AddRecipe = ({ navigation }) => {
	const [newName, setNewName] = useState("");
	const [newIngredients, setNewIngredients] = useState([]);
	const [newNotes, setNewNotes] = useState("");

	const { onSaveNewRecipe, error, setError } = useContext(RecipesContext);
};
