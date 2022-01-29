import React, { useContext } from "react";
import auth from "@react-native-firebase/auth";
import { ThemeContext } from "styled-components/native";

import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";

import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";

export const SettingsScreen = () => {
	const {
		myTheme,
		setMyTheme,
		myFont,
		setMyFont,
		lightTheme,
		setLightTheme,
		restaurantName,
		setRestaurantName,
	} = useContext(AppSettingsContext);

	return (
		<CustomView style={{ alignItems: "center", justifyContent: "center" }}>
			<CustomButton
				label="Sign Out"
				size={200}
				variant="themed"
				action={() => {
					auth().signOut();
				}}
			/>
			<View style={{ padding: 10 }} />
			<CustomInput
				label="Restaurant Name:"
				orientation="row"
				viewWidth="95%"
				inputWidth="60%"
				placeholder={restaurantName}
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				onChangeText={(text) => setRestaurantName(text)}
			/>
			<View style={{ padding: 10 }} />
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CustomText style={{ paddingRight: 5 }}>Font:</CustomText>
				<RadioButton.Group value={myFont} onValueChange={(newValue) => setMyFont(newValue)}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<CustomText>Default</CustomText>
						<RadioButton value="default" />
						<CustomText>Cursive</CustomText>
						<RadioButton value="cursive" />
					</View>
				</RadioButton.Group>
			</View>
		</CustomView>
	);
};
