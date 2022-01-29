import React, { useState, useContext } from "react";
import { Platform, TextInput, View } from "react-native";

import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { AuthContext } from "../../../services/auth/auth.context";

export const LoginScreen = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [isNoEmail, setIsNoEmail] = useState(false);
	const [isNoPassword, setIsNoPassword] = useState(false);

	const {
		authLoading,
		authError,
		setAuthError,
		signInWithEmail,
		onFacebookLoginPressed,
		onGoogleButtonPress,
	} = useContext(AuthContext);

	return (
		<CustomView
			bgColor="#FFFFFF"
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			{authError && setAuthError(null)}
			<CustomInput
				bgColor="#FFFFFF"
				textColor="#000000"
				label="Email:"
				orientation="column"
				viewWidth="80%"
				inputWidth="100%"
				value={useremail}
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
				onChangeText={(text) => {
					setIsNoEmail(false);
					onChangeUserEmail(text);
				}}
			/>
			<CustomInput
				bgColor="#FFFFFF"
				textColor="#000000"
				label="Password:"
				orientation="column"
				value={password}
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
				onChangeText={(text) => {
					setIsNoPassword(false);
					onChangePassword(text);
				}}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Login With Email"
				action={() => {
					if (!password && !useremail) {
						setIsNoPassword(true);
						setIsNoEmail(true);
						return;
					} else if (!password) {
						return setIsNoPassword(true);
					} else if (!useremail) {
						return setIsNoEmail(true);
					} else {
						signInWithEmail(useremail, password);
					}
				}}
				size={200}
				bgColor="blue"
				textColor="white"
				disabled={authLoading}
				style={{ opacity: authLoading ? 0.6 : 1 }}
			/>
			<View style={{ paddingTop: 10 }} />
			{/* <GoogleSigninButton
				style={{ width: 200 }}
				color={GoogleSigninButton.Color.Dark}
				onPress={() => onGoogleButtonPress()}
			/> */}
			<CustomButton
				label="Login with Google"
				action={() => onGoogleButtonPress()}
				size={200}
				bgColor="blue"
				textColor="white"
				disabled={authLoading}
				style={{ opacity: authLoading ? 0.6 : 1 }}
			/>
			<View style={{ paddingTop: 10 }} />
			<CustomButton
				label="Login with Facebook"
				action={() => onFacebookLoginPressed()}
				size={200}
				bgColor="blue"
				textColor="white"
				disabled={authLoading}
				style={{ opacity: authLoading ? 0.6 : 1 }}
			/>
			<View
				style={{
					flex: 0.1,
					width: "75%",
					borderBottomWidth: 0.5,
					borderBottomColor: "black",
				}}
			/>
			<View style={{ flex: 0.1 }} />
			<CustomButton
				label="Sign Up with Email"
				action={() => navigation.navigate("Signup")}
				size={200}
				bgColor="blue"
				textColor="white"
				disabled={authLoading}
				style={{ opacity: authLoading ? 0.6 : 1 }}
			/>
			{isNoEmail && !isNoPassword && (
				<>
					<View style={{ paddingTop: 10 }} />
					<CustomText variant="error">Please enter an email!</CustomText>
				</>
			)}
			{isNoPassword && !isNoEmail && (
				<>
					<View style={{ paddingTop: 10 }} />
					<CustomText variant="error">Please enter a password!</CustomText>
				</>
			)}
			{isNoEmail && isNoPassword && (
				<>
					<View style={{ paddingTop: 10 }} />
					<CustomText variant="error">Please enter an email and a password!</CustomText>
				</>
			)}
			{authError && (
				<>
					<View style={{ paddingTop: 10 }} />
					<CustomText variant="error">{authError}</CustomText>
				</>
			)}
		</CustomView>
	);
};
