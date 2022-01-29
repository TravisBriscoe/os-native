import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../features/auth/screens/auth-signin.screen";
import { SignUpScreen } from "../../features/auth/screens/auth-signup.screen";
const Stack = createStackNavigator();

export const AuthNav = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Signup" component={SignUpScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};
