import React, { useContext } from "react";
import { List } from "react-native-paper";
import { ThemeContext } from "styled-components/native";
import { View, Alert } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { ProductsContext } from "../../../services/products/products.context";

export const ProductList = ({ product }) => {
	const { desc, name, unit, dist, stored, category, split } = product;
	const { myTheme, myFont, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const { deleteProduct } = useContext(ProductsContext);

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	return (
		<List.Section>
			<List.Accordion
				title={<CustomText>{name}</CustomText>}
				description={
					desc && (
						<CustomText variant="caption" style={{ fontSize: currentTheme.fontSizes[1] }}>
							{desc}
						</CustomText>
					)
				}
				descriptionNumberOfLines={1}
				titleStyle={{
					fontSize: currentTheme.fontSizes[6],
				}}
				style={titleStyle}
			>
				{desc ? (
					<List.Item
						title="Description"
						titleStyle={titleStyle}
						right={() => <CustomText>{desc}</CustomText>}
						borderless
						rippleColor="red"
						underlayColor="red"
					/>
				) : null}
				{unit ? (
					<List.Item
						title="Unit"
						titleStyle={titleStyle}
						right={() => <CustomText>{unit}</CustomText>}
					/>
				) : null}
				{dist ? (
					<List.Item
						title="Distributor"
						titleStyle={titleStyle}
						right={() => <CustomText>{dist}</CustomText>}
					/>
				) : null}
				{stored ? (
					<List.Item
						title="Stored"
						titleStyle={titleStyle}
						right={() => <CustomText>{stored}</CustomText>}
					/>
				) : null}
				{category ? (
					<List.Item
						title="Category"
						titleStyle={titleStyle}
						right={() => <CustomText>{category}</CustomText>}
					/>
				) : null}
				{split ? (
					<List.Item
						title="Split"
						titleStyle={titleStyle}
						right={() => (
							<CustomText style={{ color: split ? "green" : "red", fontStyle: "italic" }}>
								{split ? "Yes!" : "No!"}
							</CustomText>
						)}
					/>
				) : null}
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<View
						style={{
							width: "70%",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CustomButton variant="themed" label="Edit" style={{ marginRight: 5 }} />
						<CustomButton
							variant="themed"
							label="Delete"
							style={{ marginLeft: 5 }}
							action={() => {
								Alert.alert("Delete " + name + "?", null, [
									{
										text: "Confirm",
										onPress: () => deleteProduct(product.id),
									},
									{
										text: "Cancel",
										onPress: () => null,
									},
								]);
							}}
						/>
					</View>
				</View>
			</List.Accordion>
		</List.Section>
	);
};
