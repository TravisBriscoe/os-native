import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../services/auth/auth.context";

const Stack = createStackNavigator();

const Welcome = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text>Login</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Signup")}>
				<Text>Signup</Text>
			</TouchableOpacity>
		</View>
	);
};

const Login = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const { users, setLoggedInUser } = useContext(AuthContext);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Email:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={useremail}
				onChangeText={(text) => onChangeUserEmail(text.toLowerCase())}
			/>
			<Text>Password:</Text>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={password}
				onChangeText={(text) => onChangePassword(text)}
			/>
			<Button
				title="Login With Email"
				onPress={() => {
					console.log(users);
				}}
			/>
			<Button title="Login with Google" />
		</View>
	);
};

const SignUp = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [confirmPassword, onChangeConfirmPassword] = useState(null);
	const [passwordOk, onChangePasswordOk] = useState(true);

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
			<Button title="Signup!" />
		</View>
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
