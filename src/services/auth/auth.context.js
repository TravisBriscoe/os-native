import React, { useState, createContext, useEffect } from "react";
import { fetchUsersCollection } from "./auth.service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(true);
	const [users, setUsers] = useState(null);

	useEffect(() => {
		const data = fetchUsersCollection;

		setUsers(data);
	}, []);

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
