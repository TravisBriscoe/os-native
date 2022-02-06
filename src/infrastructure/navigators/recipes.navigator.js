import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native-paper";

import { RecipesContext } from "../../services/recipes/recipes.context";
import { RecipesScreen } from "../../features/recipes/screens/recipes.screen";
import { RecipeView } from "../../features/recipes/screens/recipe-view.screen";

const Stack = createStackNavigator();

const AddNewRecipe = () => {
	<Text>Add a new Recipe!</Text>;
};

export const RecipesNav = () => {
	const { recipes } = useContext(RecipesContext);

	return (
		<Stack.Navigator initialRouteName="Recipes">
			<Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: false }} />
			<Stack.Screen name="AddRecipe" component={AddNewRecipe} />
			{recipes.map((item) => {
				return (
					<Stack.Screen name={`recipe-${item.id}`} key={item.id} options={{ title: null }}>
						{(props) => <RecipeView {...props} recipe={item} />}
					</Stack.Screen>
				);
			})}
		</Stack.Navigator>
	);
};
