import React, { useContext, useState } from "react";
import { Switch, View, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { ThemeContext } from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";

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
		material,
	} = useContext(AppSettingsContext);

	const currentTheme = useContext(ThemeContext);

	const [tempRestaurantName, setTempRestaurantName] = useState(restaurantName);

	return (
		<CustomView style={{ alignItems: "center", justifyContent: "center" }}>
			<CustomButton
				labelText
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
				variant="themed"
				placeholder={restaurantName}
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				onChangeText={(text) => setTempRestaurantName(text)}
				onEndEditing={() => setRestaurantName(tempRestaurantName)}
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
			<View style={{ padding: 10 }} />
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CustomText style={{ paddingRight: 10 }}>Light/Dark Theme</CustomText>
				<Switch
					trackColor={{
						false: "white",
						true: "black",
					}}
					thumbColor={
						lightTheme
							? currentTheme.colors[myTheme][material].secondary
							: currentTheme.colors[myTheme][material].primary
					}
					value={lightTheme}
					onValueChange={() => setLightTheme((prevState) => !prevState)}
				/>
			</View>
			<View style={{ padding: 10 }} />
			{material !== "dark" && (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomText style={{ paddingRight: 10 }}>Colour Theme:</CustomText>
					<View style={{ width: "65%", flexDirection: "row", justifyContent: "space-around" }}>
						<Pressable
							style={{
								width: 30,
								height: 30,
								borderRadius: 50,
								backgroundColor: myTheme === "black" ? "#33a2ff" : null,
								justifyContent: "center",
								alignItems: "center",
							}}
							disabled={myTheme === "black" ? true : false}
							onPress={() => {
								if (myTheme !== "black") {
									setMyTheme("black");
								}
							}}
						>
							<FontAwesome5 name="adjust" color="black" size={20} />
						</Pressable>
						<Pressable
							style={{
								width: 30,
								height: 30,
								borderRadius: 50,
								backgroundColor: myTheme === "blue" ? "#FFFFFF" : null,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								if (myTheme !== "blue") {
									setMyTheme("blue");
								}
							}}
						>
							<FontAwesome5 name="adjust" color="blue" size={20} />
						</Pressable>
						<Pressable
							style={{
								width: 30,
								height: 30,
								borderRadius: 50,
								backgroundColor: myTheme === "red" ? "#FFFFFF" : null,
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => {
								if (myTheme !== "red") {
									setMyTheme("red");
								}
							}}
						>
							<FontAwesome5 name="adjust" color="#aa3939" size={20} />
						</Pressable>
					</View>
				</View>
			)}
		</CustomView>
	);
};
