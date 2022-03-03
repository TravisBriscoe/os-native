import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { AboutScreen } from "../../features/settings/screens/about.screen";
import { CustomHeader } from "../../components/utilities/custom-header.component";

const Stack = createStackNavigator();

export const AppSettingsNav = () => {
	return (
		<Stack.Navigator
			initialRouteName="AppSettings"
			screenOptions={{
				header: ({ navigation }) => {
					return <CustomHeader navigation={navigation} />;
				},
				headerMode: "screen",
			}}
		>
			<Stack.Screen
				name="AppSettings"
				component={SettingsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="About" component={AboutScreen} />
		</Stack.Navigator>
	);
};
