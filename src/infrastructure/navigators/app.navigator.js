import React, { useContext } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";
import { CustomView } from "../../components/utilities/custom-views.component";
import { CustomText } from "../../components/utilities/custom-text.component";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { ProductsNav } from "./products.navigator";
import { RecipesNav } from "./recipes.navigator";
import { OrderListScreen } from "../../features/orderlist/screens/orderlist.screen";

const Tab = createBottomTabNavigator();

const OrderSheet = () => {
	return (
		<CustomView>
			<CustomText>OrderSheet</CustomText>
		</CustomView>
	);
};

export const AppNav = () => {
	const { myTheme, myFont, material, restaurantName } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="ProductsNav"
				screenOptions={({ route }) => ({
					tabBarStyle: {
						backgroundColor: currentTheme.colors[myTheme][material].secondary,
						color: currentTheme.colors[myTheme][material].primary,
						height: 75,
					},
					tabBarLabelStyle: {
						fontFamily: currentTheme.fonts[myFont],
						fontSize: currentTheme.fontSizes[2],
						paddingBottom: currentTheme.spacing[2],
					},
					tabBarIcon: ({ focused }) => {
						let iconName;

						if (route.name === "ProductsNav") {
							iconName = focused ? "fast-food" : "fast-food-outline";
						} else if (route.name === "RecipesNav") {
							iconName = focused ? "folder-open" : "folder-open-outline";
						} else if (route.name === "OrderSheet") {
							iconName = focused ? "paper-plane" : "paper-plane-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}

						return (
							<Ionicons
								name={iconName}
								size={40}
								color={currentTheme.colors[myTheme][material].primary}
							/>
						);
					},
					header: ({ options }) => {
						return (
							<View style={options.headerStyle.headerView}>
								<CustomText style={options.headerStyle.headerText}>{restaurantName}</CustomText>
							</View>
						);
					},
					headerStyle: {
						headerView: {
							height: 50,
							backgroundColor: currentTheme.colors[myTheme][material].secondary,
							alignItems: "center",
						},
						headerText: {
							color: currentTheme.colors[myTheme][material].primary,
							fontFamily: currentTheme.fonts[myFont],
							fontStyle: "italic",
							fontSize:
								myFont === "default" ? currentTheme.fontSizes[6] : currentTheme.fontSizes[5] + 5,
						},
					},
				})}
			>
				<Tab.Screen name="ProductsNav" component={ProductsNav} options={{ title: "Products" }} />
				<Tab.Screen name="RecipesNav" component={RecipesNav} options={{ title: "Recipes" }} />
				<Tab.Screen name="OrderSheet" component={OrderListScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
