/**
 * CustomInput component
 *
 * props: label, inputWidth = "100%" viewWidth = "80%", orientation = "row", variant = "default"
 */

import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { CustomText } from "./custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomInput = (props) => {
	const {
		label,
		inputWidth = "100%",
		viewWidth = "80%",
		orientation = "row",
		variant = "default",
		viewStyle,
	} = props;

	const { myTheme, material, myFont, screenWidth } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const defaultViewStyle = {
		alignItems: "center",
		flexDirection: orientation,
		width: viewWidth,
	};

	const inputVariants = {
		default: {
			color: "#000000",
			backgroundColor: "#FFFFFF",
			width: inputWidth,
			borderWidth: 1,
		},
		themed: {
			color: !props.textColor ? currentTheme.colors[myTheme][material].primary : props.textColor,
			backgroundColor: !props.bgColor
				? currentTheme.colors[myTheme][material].secondary
				: props.bgColor,
			fontFamily: currentTheme.fonts[myFont],
			width: inputWidth,
			borderWidth: 1,
			borderColor: currentTheme.colors[myTheme][material].primary,
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
		<View style={[defaultViewStyle, viewStyle]}>
			{label ? (
				<CustomText
					style={[{ paddingRight: orientation === "row" ? 10 : null }, textVariants[variant]]}
				>
					{label}
				</CustomText>
			) : null}
			<TextInput
				{...props}
				style={[inputVariants[variant], props.style]}
				placeholderTextColor={placeHolderTextColor}
			/>
		</View>
	);
};
