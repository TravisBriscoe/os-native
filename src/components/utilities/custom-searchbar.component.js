import React, { useContext, useState } from "react";
import { Searchbar } from "react-native-paper";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../services/app-settings/app-settings.context";
import { ProductsContext } from "../../services/products/products.context";

export const CustomSearchbar = (props) => {
	const { search } = useContext(ProductsContext);
	const { myTheme, material, myFont } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	return (
		<Searchbar
			{...props}
			placeholder="Search"
			onChangeText={(text) => {
				search(text);
			}}
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
