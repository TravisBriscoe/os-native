/**
 * CustomDivider component
 *
 * props.place is required.
 * props.size defaults to 10 unless specified
 */

import React from "react";
import { View } from "react-native";

export const CustomDivider = ({ place, size = 10, style }) => {
	if (!place) throw new Error("PLACE props is required!");

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
