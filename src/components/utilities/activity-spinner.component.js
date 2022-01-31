/**
 *
 * Custom ActivitySpinner with Theme Support
 *
 */

import React, { useContext } from "react";
import { View } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styled, { ThemeContext } from "styled-components/native";

import { CustomText } from "./custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const Spinner = () => {
	const { myTheme, material, myFont } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const halfHeight = currentTheme.screenHeight / 2 - 165;
	const halfWidth = currentTheme.screenWidth / 2 - 60;

	const LoadingContainer = styled.View`
		position: absolute;
		top: ${halfHeight}px;
		left: ${halfWidth}px;
	`;

	return (
		<LoadingContainer>
			<ActivityIndicator
				animating={true}
				color={
					currentTheme.colors[myTheme][material].primary !== "#000000"
						? currentTheme.colors[myTheme][material].primary
						: Colors.blue300
				}
				size={125}
			/>
			<View
				style={{
					position: "absolute",
					paddingTop: currentTheme.spacing[7] + currentTheme.spacing[2],
					paddingLeft: currentTheme.spacing[7],
				}}
			>
				<CustomText
					style={{
						fontSize: currentTheme.fontSizes[1],
						fontFamily: currentTheme.fonts[myFont],
						fontStyle: "italic",
					}}
				>
					Gathering
				</CustomText>
				<CustomText
					style={{
						fontSize: currentTheme.fontSizes[1],
						fontFamily: currentTheme.fonts[myFont],
						fontStyle: "italic",
					}}
				>
					Data...
				</CustomText>
			</View>
		</LoadingContainer>
	);
};
