import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomIcon = (props) => {
	const { name, action, size = 25, variant = "default" } = props;

	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const variants = {
		default: {
			backgroundColor: "#FFFFFF",
			width: size + 5,
		},
		themed: {
			backgroundColor: currentTheme.colors[myTheme][material].secondary,
			width: size + 5,
		},
	};

	return (
		<TouchableOpacity {...props} style={[props.style, variants[variant]]} onPress={action}>
			<Ionicons name={name} size={size} color={currentTheme.colors[myTheme][material].primary} />
		</TouchableOpacity>
	);
};
