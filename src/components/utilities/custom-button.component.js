import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";

import { CustomText } from "../typography/custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomButton = (props) => {
	const { style, size, action, label } = props;
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<TouchableOpacity
			style={[
				{
					backgroundColor: currentTheme.colors[myTheme][material].tertiary,
					width: size ? size : 100,
					alignItems: "center",
					padding: 10,
				},
				style,
			]}
			onPress={action}
		>
			<CustomText>{label}</CustomText>
		</TouchableOpacity>
	);
};
