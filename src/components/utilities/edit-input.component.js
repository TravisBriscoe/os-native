import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { Text } from "./text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

const deviceWidth = Dimensions.get("screen").width - 20;

export const EditInput = (props) => {
	const { type, action } = props;
	const { myTheme, material, myFont } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<View
			style={{
				flexDirection: "row",
				marginTop: 50,
				marginLeft: 20,
				width: deviceWidth,
				alignItems: "center",
			}}
		>
			{type ? <Text style={{ paddingRight: 10 }}>{type}:</Text> : null}
			<TextInput
				onChangeText={(text) => action(text)}
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
