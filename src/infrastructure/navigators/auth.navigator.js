import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, TextInput, View } from "react-native";

import { AuthContext } from "../../services/auth/auth.context";
import { CustomButton } from "../../components/utilities/custom-button.component";
import { CustomView } from "../../components/utilities/custom-views.component";
import { CustomText } from "../../components/typography/custom-text.component";
import { CustomInput } from "../../components/utilities/custom-input.components";

const Stack = createStackNavigator();

const Welcome = ({ navigation }) => {
	return (
		<CustomView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CustomButton action={() => navigation.navigate("Login")} label="Login" size={100} />
			<View style={{ paddingTop: 10 }} />
			<CustomButton action={() => navigation.navigate("Signup")} label="Signup" size={100} />
		</CustomView>
	);
};

const Login = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const { users, setLoggedInUser } = useContext(AuthContext);

	return (
		<CustomView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CustomInput
				label="Email:"
				orientation="column"
				viewWidth="80%"
				inputWidth="100%"
				value={useremail}
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
				onChangeText={(text) => onChangeUserEmail(text)}
			/>
			<CustomInput
				label="Password:"
				orientation="column"
				value={password}
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
				onChangeText={(text) => onChangePassword(text)}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Login With Email"
				action={() => {
					console.log(users);
				}}
				size={200}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton label="Login with Google" size={200} />
			<View style={{ paddingTop: 10 }} />
			<CustomButton label="Login with Apple" size={200} />
		</CustomView>
	);
};

const SignUp = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [confirmPassword, onChangeConfirmPassword] = useState(null);
	const [passwordOk, onChangePasswordOk] = useState(true);

	return (
		<CustomView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CustomText>Email:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={useremail}
				onChangeText={(text) => onChangeUserEmail(text)}
			/>
			<CustomText>Password:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={password}
				onChangeText={(text) => onChangePassword(text)}
			/>
			<CustomText>Confirm Password:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={confirmPassword}
				onChangeText={(text) => {
					onChangeConfirmPassword(text);
				}}
			/>
			{password !== confirmPassword && (
				<CustomText variant="error">Passwords don't match!</CustomText>
			)}
			<CustomButton label="Signup!" />
		</CustomView>
	);
};

export const AuthNav = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Welcome" component={Welcome} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={SignUp} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};
