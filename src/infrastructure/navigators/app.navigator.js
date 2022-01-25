import React, { useContext } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";
import { ConstantView } from "../../components/utilities/constantview.component";
import { Text } from "../../components/utilities/text.component";
import { ProductsScreen } from "../../features/products/screens/products.screen";

const Tab = createBottomTabNavigator();

const Recipes = () => {
	return (
		<ConstantView>
			<Text>Recipes</Text>
		</ConstantView>
	);
};
const OrderSheet = () => {
	return (
		<ConstantView>
			<Text>OrderSheet</Text>
		</ConstantView>
	);
};
const Settings = () => {
	return (
		<ConstantView>
			<Text>Settings</Text>
		</ConstantView>
	);
};

export const AppNav = () => {
	const { myTheme, myFont, material, restaurantName } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName="Products"
				screenOptions={({ route }) => ({
					tabBarStyle: {
						backgroundColor: currentTheme.colors[myTheme][material].secondary,
						color: currentTheme.colors[myTheme][material].primary,
					},
					tabBarLabelStyle: {
						fontFamily: currentTheme.fonts[myFont],
					},
					tabBarIcon: ({ size, focused }) => {
						let iconName;

						if (route.name === "Products") {
							iconName = focused ? "fast-food" : "fast-food-outline";
						} else if (route.name === "Recipes") {
							iconName = focused ? "folder-open" : "folder-open-outline";
						} else if (route.name === "OrderSheet") {
							iconName = focused ? "paper-plane" : "paper-plane-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}

						return (
							<Ionicons
								name={iconName}
								size={size}
								color={currentTheme.colors[myTheme][material].primary}
							/>
						);
					},
					header: ({ options }) => {
						return (
							<View style={options.headerStyle.headerView}>
								<Text style={options.headerStyle.headerText}>{restaurantName}</Text>
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
				<Tab.Screen name="Products" component={ProductsScreen} />
				<Tab.Screen name="Recipes" component={Recipes} />
				<Tab.Screen name="OrderSheet" component={OrderSheet} />
				<Tab.Screen name="Settings" component={Settings} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};
