import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { Text } from "./text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const EditInput = (props) => {
	const { label, orientation } = props;
	const { myTheme, material, myFont, screenWidth } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<View
			style={{
				flexDirection: orientation,
				marginTop: 50,
				marginLeft: 20,
				width: screenWidth - 10,
				alignItems: "center",
			}}
		>
			{type ? <Text style={{ paddingRight: 10 }}>{label}:</Text> : null}
			<TextInput
				style={{
					borderBottomWidth: 2,
					borderBottomColor: "blue",
					color: currentTheme.colors[myTheme][material].primary,
					fontFamily: currentTheme.fonts[myFont],
					width: deviceWidth,
				}}
				placeholderTextColor={currentTheme.colors[myTheme][material].primary}
				{...props}
			/>
		</View>
	);
};
