import React, { useState, useContext } from "react";
import { ScrollView, Alert } from "react-native";

import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { RecipesContext } from "../../../services/recipes/recipes.context";
import { AppContext } from "../../../services/app/app.context";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";

export const AddRecipe = ({ navigation }) => {
	const [newName, setNewName] = useState();
	const [newIngredients, setNewIngredients] = useState([]);
	const [ingredCount, setIngredCount] = useState(["", "", "", "", ""]);
	const [ingredient, setIngredient] = useState("");
	const [newNotes, setNewNotes] = useState();
	const [count, setCount] = useState(0);

	const { onSaveNewRecipe, recipes } = useContext(RecipesContext);
	const { error, setError } = useContext(AppContext);

	const forceUpdate = () => {
		return setCount((count) => count + 1);
	};

	const ingredientsValue = (text, index) => {
		const items = newIngredients;
		const item = text;
		items[index] = item;

		setNewIngredients(items);
	};

	return (
		<CustomView style={{ alignItems: "center" }}>
			<CustomView style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
				<CustomInput
					viewWidth="82%"
					orientation="column"
					variant="themed"
					label="Name:"
					value={newName}
					onChangeText={(text) => {
						if (error) {
							setError(null);
						}
						setNewName(text);
					}}
					style={{ padding: 4 }}
				/>
			</CustomView>
			<CustomView style={{ flexGrow: 4, alignSelf: "center", justifyContent: "center" }}>
				<CustomView style={{ flexGrow: 5, alignItems: "center", width: "100%" }}>
					<CustomText variant="body">Ingredients:</CustomText>
					<CustomDivider size="sm" />
					<CustomView style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
						<ScrollView style={{ flex: 1 }}>
							{ingredCount.map((ingred, index) => {
								return (
									<CustomView key={index}>
										<CustomInput
											viewWidth="96%"
											// inputWidth="90%"
											variant="themed"
											style={{ padding: 4 }}
											onChangeText={(text) => ingredientsValue(text, index)}
										/>
										<CustomDivider size="sm" />
									</CustomView>
								);
							})}
						</ScrollView>
					</CustomView>
				</CustomView>
				<CustomView style={{ alignSelf: "flex-end", justifyContent: "flex-end" }}>
					<CustomButton
						variant="themed"
						labelText
						label="Add"
						action={() => {
							const items = ingredCount;
							items.push("");

							setIngredient(items);
							forceUpdate();
						}}
					/>
				</CustomView>
			</CustomView>
			<CustomDivider />
			<CustomView style={{ flex: 2, width: "100%", alignItems: "center" }}>
				<CustomInput
					style={{ padding: 4 }}
					viewWidth="82%"
					orientation="column"
					variant="themed"
					label="Instructions:"
					multiline
					onChangeText={(text) => setNewNotes(text)}
				/>
			</CustomView>
			{error && <CustomText variant="error">{error}</CustomText>}
			<CustomView
				style={{
					flexDirection: "row",
					alignItems: "flex-end",
					justifyContent: "center",
					marginBottom: 10,
				}}
			>
				<CustomButton
					variant="themed"
					labelText
					label="Clear"
					action={() => {
						setError(null);
						setNewName();
						setNewIngredients([null, null, null, null]);
						setNewNotes();
					}}
				/>
				<CustomDivider place="left" />
				<CustomButton
					variant="themed"
					labelText
					label="Save"
					action={() => {
						if (!newName) {
							return setError("please enter a name!");
						}
						const newData = {
							id: `${recipes.length < 100 ? `00${recipes.length + 1}` : `0${recipes.length + 1}`}`,
							name: newName,
							linkUrl: `${newName.toLowerCase().replace(" ", "")}`,
							recipe: {
								ingredients: [...newIngredients],
								...(newNotes && { notes: newNotes }),
							},
						};

						onSaveNewRecipe(newData.id, newData);
						navigation.goBack();
					}}
				/>
			</CustomView>
		</CustomView>
	);
};
