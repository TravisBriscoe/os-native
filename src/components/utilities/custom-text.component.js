/**
 * Custom Text component
 *
 * Returns a custom text component that is styled according to theme.
 * If no theme is available it returns a default Text component (body).
 *
 * props:
 * children, style, variant = "body"
 *
 */

//
//

//

import React, { useContext } from "react";
import { Text } from "react-native";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomText = ({ children, style, variant = "body" }) => {
	const { myFont, myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const variants = {
		error: {
			fontSize: currentTheme.fontSizes[2],
			color: currentTheme.colors[myTheme][material].error,
			fontStyle: "italic",
		},
		title: {
			fontSize: myFont === "default" ? currentTheme.fontSizes[6] : currentTheme.fontSizes[5] + 5,
		},
		caption: {
			fontStyle: "italic",
			color: currentTheme.colors[myTheme][material].primary,
		},
		hint: {
			color: currentTheme.colors[myTheme][material].success,
			fontStyle: "italic",
		},
		body: {
			fontFamily: currentTheme.fonts[myFont],
			fontSize: myFont === "cursive" ? currentTheme.fontSizes[4] : currentTheme.fontSizes[3],
			color: currentTheme.colors[myTheme][material].primary,
		},
		default: {
			fontSize: 16,
			color: "#000000",
		},
	};

	return <Text style={[variants[variant], style]}>{children}</Text>;
};
