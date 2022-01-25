import React, { createContext, useState } from "react";

export const AppSettingsContext = createContext();

export const AppSettingsContextProvider = ({ children }) => {
	const [lightTheme, setLightTheme] = useState(true);
	const [myTheme, setMyTheme] = useState("blue");
	const [restaurantName, setRestaurantName] = useState("Fake Restaurant");
	const [myFont, setMyFont] = useState("default");
	const material = lightTheme ? "light" : "dark";

	return (
		<AppSettingsContext.Provider
			value={{
				lightTheme,
				setLightTheme,
				myTheme,
				setMyTheme,
				restaurantName,
				setRestaurantName,
				myFont,
				setMyFont,
				material,
			}}
		>
			{children}
		</AppSettingsContext.Provider>
	);
};
