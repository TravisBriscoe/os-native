import React from "react";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/infrastructure/theme/theme";

import { useFonts as useCursive } from "expo-font";
import { useFonts as useRoboto } from "expo-font";

import { AuthContextProvider } from "./src/services/auth/auth.context";
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
				<AppSettingsContextProvider>
					<AuthContextProvider>
						<AuthCall />
					</AuthContextProvider>
				</AppSettingsContextProvider>
			</ThemeProvider>
		</>
	);
};

export default App;
