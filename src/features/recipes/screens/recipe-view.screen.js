import React, { useState } from "react";

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

	const [editRecipe, setEditRecipe] = useState({ [id]: { edit: false } });
	console.log(editRecipe);
	console.log(id);
	return (
		<>
			<CustomView style={{ flex: 1 }}>
				{editRecipe[id].edit ? (
					<CustomInput
						placeholder={name}
						viewStyle={{ alignSelf: "center" }}
						style={{ paddingLeft: 5, height: 47, fontSize: 40, textAlign: "center" }}
					/>
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
								<CustomInput placeholder={el} viewStyle={{ paddingLeft: 20 }} />
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
					flex: 0.08,
					flexDirection: "row",
					alignContent: "flex-end",
					justifyContent: "flex-end",
				}}
			>
				{editRecipe[id].edit ? (
					<CustomButton
						variant="themed"
						labelText
						label="Cancel"
						style={{ marginRight: 10, marginBottom: 5 }}
						action={() => {
							setEditRecipe({ [id]: { edit: false } });
						}}
					/>
				) : (
					<CustomButton
						variant="themed"
						labelText
						label="Delete"
						style={{ marginRight: 10, marginBottom: 5 }}
					/>
				)}
				{editRecipe[id].edit ? (
					<CustomButton
						variant="themed"
						labelText
						label="Save"
						style={{ marginRight: 10, marginBottom: 5 }}
						action={() => {
							setEditRecipe({ [id]: { edit: false } });
						}}
					/>
				) : (
					<CustomButton
						variant="themed"
						labelText
						label="Edit"
						style={{ marginRight: 10, marginBottom: 5 }}
						action={() => setEditRecipe({ [id]: { edit: true } })}
					/>
				)}
			</CustomView>
		</>
	);
};
