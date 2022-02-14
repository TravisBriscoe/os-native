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
			<CustomText variant="title" style={{ textAlign: "center" }}>
				{name}
			</CustomText>
			<CustomDivider />
			<CustomText variant="caption" style={{ fontSize: 20, paddingLeft: 10 }}>
				Ingredients:
			</CustomText>
			{ingredients.map((el, index) => {
				return (
					<CustomText key={index} style={{ paddingLeft: 20 }}>
						{el}
					</CustomText>
				);
			})}
			{notes && (
				<>
					<CustomDivider />
					<CustomDivider />
					<CustomText variant="caption" style={{ fontSize: 20, paddingLeft: 10 }}>
						Instructions:
					</CustomText>
					<CustomText variant="body" style={{ paddingLeft: 20, fontStyle: "italic" }}>
						{notes}
					</CustomText>
				</>
			)}
		</CustomView>
	);
};
