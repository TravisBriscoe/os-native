import React, { createContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppSettingsContext = createContext();

export const AppSettingsContextProvider = ({ children }) => {
	const [lightTheme, setLightTheme] = useState(true);
	const [restaurantName, setRestaurantName] = useState("");
	const [nameLength, setNameLength] = useState(15);
	const [myTheme, setMyTheme] = useState("black");
	const [myFont, setMyFont] = useState("default");
	const material = lightTheme ? "light" : "dark";

	useEffect(async () => {
		const localName = await AsyncStorage.getItem("restaurantName");
		if (localName === null) {
			setRestaurantName("Fake Restaurant");
			setNameLength("Fake Restaurant".length);
		} else {
			setRestaurantName(localName);
			setNameLength(localName.length);
		}
	}, [restaurantName]);

	const onSetRestaurantName = async (newRestaurantName) => {
		const newRestaurantLabel = await AsyncStorage.setItem("restaurantName", newRestaurantName);

		setRestaurantName(newRestaurantLabel);
	};

	return (
		<AppSettingsContext.Provider
			value={{
				lightTheme,
				setLightTheme,
				myTheme,
				setMyTheme,
				restaurantName,
				onSetRestaurantName,
				myFont,
				setMyFont,
				material,
				nameLength,
			}}
		>
			{children}
		</AppSettingsContext.Provider>
	);
};
