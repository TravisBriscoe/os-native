import React, { useContext } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native-paper";

import { RecipesScreen } from "../../features/recipes/screens/recipes.screen";
import { RecipeView } from "../../features/recipes/screens/recipe-view.screen";
import { RecipesContext } from "../../services/recipes/recipes.context";
import { objToArr } from "../../services/utils/objtoarr";
import { CustomView } from "../../components/utilities/custom-views.component";
import { CustomIcon } from "../../components/utilities/custom-icon.component";

const Stack = createStackNavigator();

const AddNewRecipe = () => {
	return <Text>Add a new Recipe!</Text>;
};

export const RecipesNav = () => {
	const { recipes } = useContext(RecipesContext);
	const newRecipes = objToArr(recipes.data);

	return (
		<Stack.Navigator
			initialRouteName="Recipes"
			screenOptions={() => ({
				animationEnabled: false,
				header: ({ navigation }) => {
					return (
						<CustomView header style={{ height: 30 }}>
							<CustomIcon variant="themed" name="arrow-back" action={() => navigation.goBack()} />
						</CustomView>
					);
				},
				headerBackTitle: " ",
				headerMode: "screen",
			})}
		>
			<Stack.Screen name="Recipes" component={RecipesScreen} options={{ headerShown: false }} />
			<Stack.Screen
				name="AddRecipe"
				component={AddNewRecipe}
				options={{ title: "Add New Recipe" }}
			/>
			{newRecipes.map((item) => {
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
