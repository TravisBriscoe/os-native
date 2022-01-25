import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";
import { ProductsContextProvider } from "../../../services/products/products.context";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";

export const AuthCall = () => {
	const { loggedInUser, users } = useContext(AuthContext);
	const { material } = useContext(AppSettingsContext);

	return (
		<>
			{loggedInUser ? (
				<ProductsContextProvider>
					<AppNav />
				</ProductsContextProvider>
			) : (
				<AuthNav />
			)}
			<StatusBar style={!material} />
		</>
	);
};
