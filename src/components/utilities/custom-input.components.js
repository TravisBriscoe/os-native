import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { Text } from "./text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomInput = (props) => {
	const { label, orientation, width } = props;
	const { myTheme, material, myFont, screenWidth } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<View
			style={{
				flexDirection: orientation,
				marginTop: 50,
				marginLeft: 20,
				width: width ? width : screenWidth - 10,
				alignItems: "center",
			}}
		>
			{label ? <Text style={{ paddingRight: 10 }}>{label}:</Text> : null}
			<TextInput
				style={{
					color: currentTheme.colors[myTheme][material].primary,
					backgroundColor: currentTheme.colors[myTheme][material].secondary,
					fontFamily: currentTheme.fonts[myFont],
					width: width ? width : screenWidth,
				}}
				placeholderTextColor={currentTheme.colors[myTheme][material].primary}
				{...props}
			/>
		</View>
	);
};
