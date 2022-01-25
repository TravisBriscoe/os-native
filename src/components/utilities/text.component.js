import React, { useContext } from "react";
import { Text as RNText } from "react-native";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const Text = (props) => {
	const { myFont, myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const defaultStyle = {
		fontFamily: currentTheme.fonts[myFont],
		fontSize:
			currentTheme.fonts[myFont] === "cursive"
				? currentTheme.fontSizes[4]
				: currentTheme.fontSizes[3],
		color: currentTheme.colors[myTheme][material].primary,
	};

	return <RNText style={[defaultStyle, props.style]}>{props.children}</RNText>;
};
