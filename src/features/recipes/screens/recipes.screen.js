import React, { useContext } from "react";
import { FlatList, RefreshControl } from "react-native";

import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { CustomFab } from "../../../components/utilities/custom-fab.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { RecipesContext } from "../../../services/recipes/recipes.context";
import { AppContext } from "../../../services/app/app.context";

export const RecipesScreen = ({ navigation }) => {
	const { recipes, isRefreshing, fetchRecipes } = useContext(RecipesContext);
	const { isLoading, error } = useContext(AppContext);

	return (
		<CustomView
			style={{
				flex: 1,
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{isLoading && <CustomSpinner />}
			{error && <CustomText variant="error">{error}</CustomText>}
			<CustomFab action={() => navigation.navigate("AddRecipe")} />
			<CustomDivider place="bottom" size="med" />
			<FlatList
				data={recipes}
				initialNumToRender={20}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							fetchRecipes();
						}}
					/>
				}
				renderItem={({ item }) => (
					<CustomButton
						labelText
						variant="themed"
						recipe
						label={item.name}
						style={{ paddingBottom: 5, width: "100%" }}
						action={() => navigation.navigate(`recipe-${item.id}`)}
					/>
				)}
			/>
		</CustomView>
	);
};
