import React, { useState, useContext } from "react";
import { View, ScrollView, Alert } from "react-native";

import { RecipesContext } from "../../../services/recipes/recipes.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomView } from "../../../components/utilities/custom-views.component";

export const RecipeView = ({ recipe }) => {
	const {
		name,
		id,
		recipe: { ingredients, notes },
	} = recipe;

	const { onDeleteRecipe } = useContext(RecipesContext);

	const [editRecipe, setEditRecipe] = useState({ [id]: { edit: false } });

	return (
		<CustomView style={{ flex: 1 }}>
			<ScrollView>
				<CustomView style={{ flex: 1 }}>
					{editRecipe[id].edit ? (
						<View style={{ height: 47 }}>
							<CustomInput
								placeholder={name}
								viewStyle={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
								style={{ paddingLeft: 5, textAlign: "center" }}
							/>
						</View>
					) : (
						<CustomText variant="title" style={{ textAlign: "center" }}>
							{name}
						</CustomText>
					)}
					<CustomDivider />
					<CustomText variant="caption" style={{ fontSize: 20, paddingLeft: 10 }}>
						Ingredients:
					</CustomText>
					{ingredients.map((el, index) => {
						return (
							<>
								{editRecipe[id].edit ? (
									<CustomInput placeholder={el} key={index} viewStyle={{ paddingLeft: 20 }} />
								) : (
									<CustomText key={index} style={{ paddingLeft: 20 }}>
										{el}
									</CustomText>
								)}
							</>
						);
					})}
					{notes && (
						<>
							<CustomDivider />
							<CustomDivider />
							<CustomText variant="caption" style={{ fontSize: 20, paddingLeft: 10 }}>
								Instructions:
							</CustomText>
							{editRecipe[id].edit ? (
								<CustomInput
									multiline={true}
									placeholder={notes}
									numberOfLines={10}
									textAlignVertical="top"
									viewStyle={{ paddingLeft: 20 }}
								/>
							) : (
								<CustomText variant="body" style={{ paddingLeft: 20, fontStyle: "italic" }}>
									{notes}
								</CustomText>
							)}
						</>
					)}
				</CustomView>
				<CustomView
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						marginTop: 10,
					}}
				>
					{editRecipe[id].edit ? (
						<CustomButton
							variant="themed"
							labelText
							label="Cancel"
							style={{ marginRight: 10, alignSelf: "center" }}
							action={() => {
								setEditRecipe({ [id]: { edit: false } });
							}}
						/>
					) : (
						<CustomButton
							variant="themed"
							labelText
							label="Delete"
							style={{ marginRight: 10, alignSelf: "center" }}
							action={() => {
								Alert.alert(
									"Delete recipe " + name + "?",
									"\nAre you sure?\nThis operation cannot be undone.",
									[
										{
											text: "Cancel",
											onPress: () => null,
										},
										{
											text: "Confirm",
											onPress: () => {
												setEditRecipe({ [id]: { edit: false } });
												onDeleteRecipe(id);
											},
										},
									]
								);
							}}
						/>
					)}
					{editRecipe[id].edit ? (
						<CustomButton
							variant="themed"
							labelText
							label="Save"
							style={{ marginRight: 10, alignSelf: "center" }}
							action={() => {
								setEditRecipe({ [id]: { edit: false } });
							}}
						/>
					) : (
						<CustomButton
							variant="themed"
							labelText
							label="Edit"
							style={{ marginRight: 10, alignSelf: "center" }}
							action={() => setEditRecipe({ [id]: { edit: true } })}
						/>
					)}
				</CustomView>
			</ScrollView>
		</CustomView>
	);
};
