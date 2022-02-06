import React from "react";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomView } from "../../../components/utilities/custom-views.component";

export const RecipeView = ({ recipe }) => {
	const {
		name,
		recipe: { ingredients, notes },
	} = recipe;

	return (
		<CustomView>
			<CustomText>{name}</CustomText>
			<CustomDivider />
			<CustomText>Ingredients:</CustomText>
			{ingredients.map((el, index) => {
				return <CustomText key={index}>{el}</CustomText>;
			})}
			{notes && (
				<>
					<CustomDivider />
					<CustomDivider />
					<CustomText>Instructions:</CustomText>
					<CustomText style={{ color: "red" }}>{notes}</CustomText>
				</>
			)}
		</CustomView>
	);
};
