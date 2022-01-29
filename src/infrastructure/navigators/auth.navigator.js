import React, { useContext, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Platform, TextInput, View } from "react-native";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import auth from "@react-native-firebase/auth";

import { AuthContext } from "../../services/auth/auth.context";
import { CustomButton } from "../../components/utilities/custom-button.component";
import { CustomView } from "../../components/utilities/custom-views.component";
import { CustomText } from "../../components/utilities/custom-text.component";
import { CustomInput } from "../../components/utilities/custom-input.components";

GoogleSignin.configure({
	webClientId: "247627559502-dhssc74p8u7ljrgn2aavbcs3a61hl5po.apps.googleusercontent.com",
});
// GoogleSignin.configure({ webClientId: '' });

const Stack = createStackNavigator();

async function onGoogleButtonPress() {
	try {
		// Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
	} catch (err) {
		console.log("Error: " + err);
	}
}

async function onFacebookLoginPressed() {
	try {
		// Attempt login with permissions
		const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

		if (result.isCancelled) {
			throw "User cancelled the login process";
		}

		// Once signed in, get the users AccesToken
		const data = await AccessToken.getCurrentAccessToken();

		if (!data) {
			throw "Something went wrong obtaining access token";
		}

		// Create a Firebase credential with the AccessToken
		const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

		// Sign-in the user with the credential
		return auth().signInWithCredential(facebookCredential);
	} catch (err) {
		console.log(err);
	}
}

async function signInWithEmail(username, password) {
	try {
		auth().signInWithEmailAndPassword(username, password);
	} catch (err) {
		console.log("Email login failed: " + err);
	}
}

async function signUpWithEmail(username, password) {
	try {
		auth().createUserWithEmailAndPassword(username, password);
	} catch (err) {
		console.log("Email signup failed: " + err);
	}
}

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
			<GoogleSigninButton
				style={{ width: 200 }}
				color={GoogleSigninButton.Color.Dark}
				onPress={() => onGoogleButtonPress()}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Login with Facebook"
				action={() => onFacebookLoginPressed()}
				size={200}
				style={{ backgroundColor: "blue", color: "white" }}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Login With Email"
				action={() => signInWithEmail(useremail, password)}
				size={200}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Sign Up with Email"
				action={() => navigation.navigate("Signup")}
				size={200}
			/>
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
			<CustomButton label="Signup!" action={() => signUpWithEmail(useremail, password)} />
		</CustomView>
	);
};

export const AuthNav = () => {
	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={SignUp} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};
