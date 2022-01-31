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

export const CustomDivider = ({ style, place = "top", size = "med" }) => {
	const currentTheme = useContext(ThemeContext);

	if (place === "xsm") {
		return currentTheme.sizing[0];
	} else if (place === "sm") {
		return currentTheme.sizing[2];
	} else if (place === "med") {
		return currentTheme.sizing[4];
	} else if (place === "lg") {
		return currentTheme.sizing[5];
	} else if (place === "xlg") {
		return currentTheme.sizing[6];
	} else if (place === "xxlg") {
		return currentTheme.sizing[7];
	} else if (place === "xxxlg") {
		return currentTheme.sizing[8];
	}

	const placing = () => {
		if (place === "top") {
			return "paddingTop";
		} else if (place === "bottom") {
			return "paddingBottom";
		} else if (place === "right") {
			return "paddingRight";
		} else if (place === "left") {
			return "paddingLeft";
		}
	};

	return <View {...props} style={[{ placing: size }, style]} />;
};
