/**
 *
 * Custom FAB for adding NewRecipes or NewProducts
 *
 */

import React, { useContext } from "react";
import { FAB } from "react-native-paper";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomFab = (props) => {
	const { myTheme, material, myFonts, spacing } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<FAB
			{...props}
			style={[
				{
					position: "absolute",
					bottom: 10,
					right: 10,
					borderRadius: 50,
					elevation: 3,
					zIndex: 3,
					backgroundColor: currentTheme.colors[myTheme][material].primary,
					color: currentTheme.colors[myTheme][material].secondary,
				},
				props.style,
			]}
			small
			icon={props.type}
			onPress={props.action}
		/>
	);
};
