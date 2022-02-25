import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native-paper";

import { RecipesScreen } from "../../features/recipes/screens/recipes.screen";
import { RecipeView } from "../../features/recipes/screens/recipe-view.screen";
import { RecipesContext } from "../../services/recipes/recipes.context";
import { AddRecipe } from "../../features/recipes/screens/add-new-recipes.screen";
import { CustomHeader } from "../../components/utilities/custom-header.component";

const Stack = createStackNavigator();

export const RecipesNav = () => {
	const { recipes } = useContext(RecipesContext);

	return (
		<Stack.Navigator
			initialRouteName="Recipes"
			screenOptions={() => ({
				animationEnabled: false,
				header: ({ navigation }) => {
					return <CustomHeader navigation={navigation} />;
				},
				headerMode: "screen",
			})}
		>
			<Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: false }} />
			<Stack.Screen name="AddRecipe" component={AddRecipe} options={{ title: "Add New Recipe" }} />
			{recipes.map((item) => {
				return (
					<Stack.Screen
						name={`recipe-${item.id}`}
						key={item.id}
						options={{
							title: null,
						}}
					>
						{(props) => <RecipeView {...props} recipe={item} />}
					</Stack.Screen>
				);
			})}
		</Stack.Navigator>
	);
};
