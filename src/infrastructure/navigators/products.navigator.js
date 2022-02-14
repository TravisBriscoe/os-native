import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { ProductsScreen } from "../../features/products/screens/products.screen";
import { AddProduct } from "../../features/products/screens/add-new-product.screen";
import { CustomHeader } from "../../components/utilities/custom-header.component";

const Stack = createStackNavigator();

export const ProductsNav = () => {
	return (
		<Stack.Navigator
			initialRouteName="Products"
			screenOptions={{
				header: ({ navigation }) => {
					return <CustomHeader navigation={navigation} />;
				},
				headerMode: "screen",
			}}
		>
			<Stack.Screen name="Products" options={{ headerShown: false }} component={ProductsScreen} />
			<Stack.Screen name="AddProduct" component={AddProduct} options={{ title: null }} />
		</Stack.Navigator>
	);
};
