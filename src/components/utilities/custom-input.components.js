import React, { useContext } from "react";
import { TextInput, View, Dimensions } from "react-native";
import { ThemeContext } from "styled-components/native";

import { CustomText } from "./custom-text.component";
import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomInput = (props) => {
	const { label, orientation, viewWidth, inputWidth } = props;
	const { myTheme, material, myFont, screenWidth } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<View
			style={{
				flexDirection: orientation,
				// height: 40,
				// margin: 12,
				alignItems: "center",
				width: viewWidth ? viewWidth : "80%",
			}}
		>
			{label ? <CustomText style={{ paddingRight: 10 }}>{label}</CustomText> : null}
			<TextInput
				{...props}
				style={[
					{
						color: currentTheme.colors[myTheme][material].primary,
						backgroundColor: currentTheme.colors[myTheme][material].secondary,
						fontFamily: currentTheme.fonts[myFont],
						width: inputWidth ? inputWidth : "100%",
					},
					props.style,
				]}
				placeholderTextColor={currentTheme.colors[myTheme][material].tertiary}
			/>
		</View>
	);
};
