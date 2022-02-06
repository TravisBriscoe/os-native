import React, { useContext } from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";

import { RecipesContext } from "../../../services/recipes/recipes.context";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";

export const RecipesScreen = ({ navigation }) => {
	const { isLoading, error, recipes } = useContext(RecipesContext);

	return (
		<CustomView
			style={{
				flex: 1,
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			{isLoading && <CustomSpinner />}
			{error && <Text style={{ color: "red", textStyle: "italic" }}>{error}</Text>}
			<CustomDivider place="bottom" size="med" />
			<FlatList
				data={recipes}
				initialNumToRender={20}
				keyExtractor={(item, index) => index}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={{ paddingBottom: 5 }}
						onPress={() => navigation.navigate(`recipe-${item.id}`)}
					>
						<Text>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</CustomView>
	);
};
