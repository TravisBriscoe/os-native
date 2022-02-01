/**
 * Custom View and Custom SafeAreaView
 *
 * SafeAreaView is the main view wrapper, it returns a color based on the Theme,
 * If no theme is wanted pass bgColor prop.
 *
 * Custom view is similar to above except it adds the themes background.
 *
 * props:
 * style, children, bgColor
 *
 */

import React, { useContext } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { ThemeContext } from "styled-components/native";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomMainView = ({ style, children, bgColor }) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const topMargin = Platform.OS !== "ios" ? Math.floor(StatusBar.currentHeight) : null;

	const backgroundStyle = {
		// backgroundColor: bgColor ? bgColor : currentTheme.colors[myTheme][material].secondary,
		flex: 1,
		marginTop: topMargin,
	};

	return <SafeAreaView style={[backgroundStyle, style]}>{children}</SafeAreaView>;
};

export const CustomView = ({ children, style, bgColor }) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const backgroundStyle = {
		backgroundColor: bgColor ? bgColor : currentTheme.colors[myTheme][material].secondary,
		flex: 1,
	};

	return <SafeAreaView style={[backgroundStyle, style]}>{children}</SafeAreaView>;
};
