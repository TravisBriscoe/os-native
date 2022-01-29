/**
 * CustomButton component
 *
 * if selecting variant = "themed" textColor prop is required (for now), size prop and bgColor prop is optional
 */

import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { ThemeContext } from "styled-components/native";

import { CustomText } from "./custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";
import { CurrentRenderContext } from "@react-navigation/native";

export const CustomButton = (props) => {
	const { style, size, action, label, variant = "default" } = props;
	const { myTheme, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const constantStyle = {
		alignItems: "center",
		padding: 10,
	};

	const buttonVariants = {
		default: {
			backgroundColor: !props.bgColor ? "#FFFFFF" : props.bgColor,
			width: !size ? 100 : size,
		},
		themed: {
			backgroundColor: currentTheme.colors[myTheme][material].tertiary,
			width: !size ? 100 : size,
		},
	};

	const textVariants = {
		default: {
			color: !props.textColor ? "#000000" : props.textColor,
		},
		themed: {
			color: currentTheme.colors[myTheme][material].primary,
		},
	};

	return (
		<TouchableOpacity
			{...props}
			style={[constantStyle, buttonVariants[variant], style]}
			onPress={action}
		>
			<CustomText style={textVariants[variant]}>{label}</CustomText>
		</TouchableOpacity>
	);
};
