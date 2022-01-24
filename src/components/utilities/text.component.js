import React, { useContext } from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const Text = (props) => {
	const { myFont, myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const styles = StyleSheet.create({
		defaultStyle: {
			fontFamily: currentTheme.fonts[myFont],
			fontSize:
				currentTheme.fonts[myFont] === "cursive"
					? currentTheme.fontSizes[4]
					: currentTheme.fontSizes[3],
			color: currentTheme.colors[myTheme][material].primary,
		},
	});

	return <RNText style={[styles.defaultStyle, props.style]}>{props.children}</RNText>;
};
