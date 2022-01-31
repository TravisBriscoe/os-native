/**
 * CustomDivider component
 *
 * props:
 * style, place = "top", size = "med"
 *
 */

import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "styled-components/native";

export const CustomDivider = (props) => {
	const { style, place = "top", size = "med" } = props;
	const currentTheme = useContext(ThemeContext);

	const sizing = () => {
		if (size === "xsm") {
			return currentTheme.spacing[0];
		} else if (size === "sm") {
			return currentTheme.spacing[2];
		} else if (size === "med") {
			return currentTheme.spacing[4];
		} else if (size === "lg") {
			return currentTheme.spacing[5];
		} else if (size === "xlg") {
			return currentTheme.spacing[6];
		} else if (size === "xxlg") {
			return currentTheme.spacing[7];
		} else if (size === "xxxlg") {
			return currentTheme.spacing[8];
		}
	};

	const placing = () => {
		if (place === "top") {
			return "marginTop";
		} else if (place === "bottom") {
			return "paddingBottom";
		} else if (place === "right") {
			return "paddingRight";
		} else if (place === "left") {
			return "paddingLeft";
		}
	};

	return <View {...props} style={[{ [placing()]: sizing() }, style]} />;
};
