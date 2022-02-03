import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Searchbar } from "react-native-paper";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";

export const CustomSearchbar = (props) => {
	const [keyword, setKeyword] = useState("");
	const { myTheme, material, myFont, spacing } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<Searchbar
			{...props}
			placeholder="Search"
			value={keyword}
			onChangeText={(text) => setKeyword(text)}
			style={{
				width: "90%",
				alignSelf: "center",
				backgroundColor: currentTheme.colors[myTheme][material].secondary,
				paddingTop: 10,
			}}
			inputStyle={[
				{
					paddingLeft: currentTheme.spacing[1],
					paddingRight: currentTheme.spacing[1],
					color: currentTheme.colors[myTheme][material].primary,
					backgroundColor: currentTheme.colors[myTheme][material].secondary,
					fontFamily: currentTheme.fonts[myFont],
				},
				props.style,
			]}
			placeholderTextColor={currentTheme.colors[myTheme][material].primary}
			iconColor={currentTheme.colors[myTheme][material].primary}
		/>
	);
};
