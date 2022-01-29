/**
 * CustomInput component
 */

import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { CustomText } from "./custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomInput = (props) => {
	const { label, orientation = "row", viewWidth, inputWidth, variant = "default" } = props;
	const { myTheme, material, myFont, screenWidth } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const defaultViewStyle = {
		alignItems: "center",
		flexDirection: orientation,
		width: !viewWidth ? "80%" : viewWidth,
	};

	const inputVariants = {
		default: {
			color: "#000000",
			backgroundColor: "#FFFFFF",
			width: inputWidth ? inputWidth : "100%",
		},
		themed: {
			color: !props.textColor ? currentTheme.colors[myTheme][material].primary : props.textColor,
			backgroundColor: !props.bgColor
				? currentTheme.colors[myTheme][material].secondary
				: props.bgColor,
			fontFamily: currentTheme.fonts[myFont],
			width: inputWidth ? inputWidth : "100%",
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

	const placeHolderTextColor = !props.textColor
		? currentTheme.colors[myTheme][material].tertiary
		: "#616161";

	return (
		<View style={defaultViewStyle}>
			{label ? (
				<CustomText style={[{ paddingRight: 10 }, textVariants[variant]]}>{label}</CustomText>
			) : null}
			<TextInput
				{...props}
				style={[inputVariants[variant], props.style]}
				placeholderTextColor={placeHolderTextColor}
			/>
		</View>
	);
};
