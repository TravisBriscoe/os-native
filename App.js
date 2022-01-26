import { ThemeProvider } from "styled-components/native";

import { useFonts as useCursive } from "expo-font";
import { useFonts as useRoboto } from "expo-font";

import { MainView } from "./src/components/utilities/custom-views.component";
import theme from "./src/components/theme/theme";
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
		<ThemeProvider theme={theme}>
			<AppSettingsContextProvider>
				<AuthContextProvider>
					<MainView>
						<AuthCall />
					</MainView>
				</AuthContextProvider>
			</AppSettingsContextProvider>
		</ThemeProvider>
	);
};

export default App;
