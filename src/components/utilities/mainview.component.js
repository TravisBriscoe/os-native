import React, { useContext } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

const NewView = styled(SafeAreaView)`
	flex: 1;
	${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

export const MainView = (props) => {
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const topMargin =
		Platform.OS === "ios"
			? Math.floor(StatusBar.currentHeight) + "px"
			: Math.floor(StatusBar.currentHeight);

	const backgroundStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		flex: 1,
		marginTop: topMargin,
	};

	return <SafeAreaView style={[backgroundStyle, props.style]}>{props.children}</SafeAreaView>;
};
