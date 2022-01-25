import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, TextInput, View } from "react-native";

import { AuthContext } from "../../services/auth/auth.context";
import { CustomButton } from "../../components/utilities/custom-button.component";
import { ConstantView } from "../../components/utilities/constantview.component";
import { Text } from "../../components/utilities/text.component";

const Stack = createStackNavigator();

const Welcome = ({ navigation }) => {
	return (
		<ConstantView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CustomButton action={() => navigation.navigate("Login")} label="Login" size={100} />
			<View style={{ paddingTop: 10 }} />
			<CustomButton action={() => navigation.navigate("Signup")} label="Signup" size={100} />
		</ConstantView>
	);
};

const Login = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const { users, setLoggedInUser } = useContext(AuthContext);

	return (
		<ConstantView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Email:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={useremail}
				onChangeText={(text) => onChangeUserEmail(text.toLowerCase())}
			/>
			<Text>Password:</Text>
			<TextInput
				style={{
					height: 40,
					margin: 12,
					borderWidth: 1,
					padding: 10,
					width: "80%",
				}}
				value={password}
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
		</ConstantView>
	);
};

const SignUp = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [confirmPassword, onChangeConfirmPassword] = useState(null);
	const [passwordOk, onChangePasswordOk] = useState(true);

	return (
		<ConstantView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Email:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={useremail}
				onChangeText={(text) => onChangeUserEmail(text)}
			/>
			<Text>Password:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={password}
				onChangeText={(text) => onChangePassword(text)}
			/>
			<Text>Confirm Password:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={confirmPassword}
				onChangeText={(text) => {
					onChangeConfirmPassword(text);
				}}
			/>
			{password !== confirmPassword && <Text style={{ color: "red" }}>Passwords don't match!</Text>}
			<CustomButton label="Signup!" />
		</ConstantView>
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
