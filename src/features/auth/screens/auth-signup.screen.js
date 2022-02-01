import React, { useState, useContext } from "react";
import { TextInput, View } from "react-native";

import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { AuthContext } from "../../../services/auth/auth.context";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";

export const SignUpScreen = ({ navigation }) => {
	const [useremail, onChangeUserEmail] = useState(null);
	const [password, onChangePassword] = useState(null);
	const [confirmPassword, onChangeConfirmPassword] = useState(null);
	const [passwordOk, onChangePasswordOk] = useState(true);
	const [noPassword, setNoPassword] = useState(false);
	const [noEmail, setNoEmail] = useState(false);

	const { authLoading, authError, setAuthError, signUpWithEmail } = useContext(AuthContext);

	return (
		<CustomView
			bgColor="#FFFFFF"
			style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
		>
			<CustomText>Email:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={useremail}
				onChangeText={(text) => {
					setNoEmail(false);
					setAuthError(null);
					onChangeUserEmail(text);
				}}
			/>
			<CustomText>Password:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={password}
				onChangeText={(text) => {
					setNoPassword(false);
					setAuthError(null);
					onChangePassword(text);
				}}
			/>
			<CustomText>Confirm Password:</CustomText>
			<TextInput
				style={{ height: 40, margin: 12, borderWidth: 1, padding: 10, width: "80%" }}
				value={confirmPassword}
				onEndEditing={() => {
					if (password !== confirmPassword) {
						onChangePasswordOk(false);
					} else {
						onChangePasswordOk(true);
					}
					setAuthError(null);
				}}
				onChangeText={(text) => onChangeConfirmPassword(text)}
			/>
			<CustomButton
				disabled={authLoading}
				label="Signup!"
				bgColor="blue"
				textColor="white"
				style={{ opacity: authLoading ? 0.6 : 1 }}
				action={() => {
					if (password !== confirmPassword) return;
					if (!password && !useremail) {
						setNoEmail(true);
						setNoPassword(true);
						return;
					} else if (!password) {
						return setNoPassword(true);
					} else if (!useremail) {
						return setNoEmail(true);
					} else {
						return signUpWithEmail(useremail, password);
					}
				}}
			/>
			{noEmail && !noPassword && (
				<>
					<CustomDivider place="top" />
					<CustomText variant="error">Please enter an email</CustomText>
				</>
			)}
			{noPassword && !noEmail && (
				<>
					<CustomDivider place="top" />
					<CustomText variant="error">Please enter a password!</CustomText>
				</>
			)}
			{!passwordOk && !noPassword && !noEmail && (
				<>
					<CustomDivider place="top" />
					<CustomText variant="error">Passwords don't match!</CustomText>
				</>
			)}
			{noPassword && noEmail && (
				<>
					<CustomDivider place="top" />
					<CustomText variant="error">Please enter an email and password</CustomText>
				</>
			)}
			{authError && (
				<>
					<CustomDivider place="top" />
					<CustomText variant="error">{authError}</CustomText>
				</>
			)}
		</CustomView>
	);
};
