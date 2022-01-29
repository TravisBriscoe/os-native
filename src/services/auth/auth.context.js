import React, { useState, createContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";

GoogleSignin.configure({
	webClientId: "247627559502-dhssc74p8u7ljrgn2aavbcs3a61hl5po.apps.googleusercontent.com",
});

import { fetchUsersCollection } from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(false);
	const [initializing, setInitializing] = useState(true);
	const [users, setUsers] = useState(null);
	const [authLoading, setAuthLoading] = useState(false);
	const [authError, setAuthError] = useState(null);

	const signUpWithEmail = async (username, password) => {
		setAuthLoading(true);
		auth()
			.createUserWithEmailAndPassword(username, password)
			.then(() => setAuthLoading(false))
			.catch((err) => {
				err.code === "auth/email-already-in-use"
					? setAuthError("Email already in use. Please use another or sign in with that email")
					: setAuthError(err.message);
				setAuthLoading(false);
			});
	};

	const onGoogleButtonPress = async () => {
		try {
			setAuthLoading(true);

			// Get the users ID token
			const { idToken } = await GoogleSignin.signIn();

			// Create a Google credential with the token
			const googleCredential = auth.GoogleAuthProvider.credential(idToken);

			setAuthLoading(false);
			// Sign-in the user with the credential
			return auth().signInWithCredential(googleCredential);
		} catch (err) {
			setAuthLoading(false);
			setAuthError("Error!!!: " + err.message);
		}
	};

	const onFacebookLoginPressed = async () => {
		try {
			setAuthLoading(true);

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

			setAuthLoading(false);
			// Sign-in the user with the credential
			return auth().signInWithCredential(facebookCredential);
		} catch (err) {
			setAuthLoading(false);
			setAuthError(err);
		}
	};

	const signInWithEmail = async (username, password) => {
		setAuthLoading(true);
		auth()
			.signInWithEmailAndPassword(username, password)
			.then(() => setAuthLoading(false))
			.catch((err) => {
				setAuthLoading(false);
				setAuthError(err);
			});
	};

	const onAuthStateChanged = (user) => {
		setLoggedInUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		const data = fetchUsersCollection();
		setUsers(data);

		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

		return subscriber;
	}, []);

	if (initializing) return null;

	return (
		<AuthContext.Provider
			value={{
				users,
				setUsers,
				loggedInUser,
				setLoggedInUser,
				authLoading,
				authError,
				setAuthError,
				signUpWithEmail,
				onFacebookLoginPressed,
				onGoogleButtonPress,
				signInWithEmail,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
