import React, { useState, createContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";

import { fetchUsersCollection } from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(false);
	const [initializing, setInitializing] = useState(true);
	const [users, setUsers] = useState(null);

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
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
