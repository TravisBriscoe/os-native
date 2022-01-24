import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { ThemeContext } from "styled-components/native";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const ConstantView = (props) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const backgroundStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		flex: 1,
	};

	return <SafeAreaView style={[backgroundStyle, props.style]}>{props.children}</SafeAreaView>;
};
