import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";

import { CustomMainView } from "../../../components/utilities/custom-views.component";
import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";
import { ProductsContextProvider } from "../../../services/products/products.context";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { RecipesContextProvider } from "../../../services/recipes/recipes.context";

export const AuthCall = () => {
	const { loggedInUser, users } = useContext(AuthContext);
	const { material } = useContext(AppSettingsContext);

	return (
		<>
			<CustomMainView>
				{loggedInUser ? (
					<ProductsContextProvider>
						<RecipesContextProvider>
							<AppNav />
						</RecipesContextProvider>
					</ProductsContextProvider>
				) : (
					<AuthNav />
				)}
			</CustomMainView>
		</>
	);
};
