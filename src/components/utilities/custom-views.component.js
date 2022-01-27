import React, { useContext } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { ThemeContext } from "styled-components/native";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomMainView = (props) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const topMargin = Platform.OS !== "ios" ? Math.floor(StatusBar.currentHeight) : null;

	const backgroundStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		flex: 1,
		marginTop: topMargin,
	};

	return <SafeAreaView style={[backgroundStyle, props.style]}>{props.children}</SafeAreaView>;
};

export const CustomView = (props) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const backgroundStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		flex: 1,
	};

	return <SafeAreaView style={[backgroundStyle, props.style]}>{props.children}</SafeAreaView>;
};
