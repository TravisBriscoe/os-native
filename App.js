import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/infrastructure/theme/theme";
import { StatusBar } from "expo-status-bar";

import { useFonts as useCursive } from "expo-font";
import { useFonts as useRoboto } from "expo-font";

import { AuthContextProvider } from "./src/services/auth/auth.context";
import { ProductsContextProvider } from "./src/services/products/products.context";
import { RecipesContextProvider } from "./src/services/recipes/recipes.context";
import { AppSettingsContextProvider } from "./src/services/app-settings/app-settings.context";
import { AuthCall } from "./src/features/auth/components/auth-call.component";

const App = () => {
	const [cursiveLoaded] = useCursive({
		cursive: require("./assets/fonts/cursive.ttf"),
	});
	const [robotoLoaded] = useRoboto({
		default: require("./assets/fonts/default.ttf"),
	});

	if (!cursiveLoaded || !robotoLoaded) {
		return null;
	}

	return (
		<>
			<ThemeProvider theme={theme}>
				<AuthContextProvider>
					<AppSettingsContextProvider>
						<ProductsContextProvider>
							<RecipesContextProvider>
								<AuthCall />
							</RecipesContextProvider>
						</ProductsContextProvider>
					</AppSettingsContextProvider>
				</AuthContextProvider>
			</ThemeProvider>
			<StatusBar style="auto" />
		</>
	);
};

export default App;
