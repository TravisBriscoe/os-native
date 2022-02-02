import React, { useContext, useState } from "react";
import { List } from "react-native-paper";
import { ThemeContext } from "styled-components/native";
import { View, Alert } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { ProductsContext } from "../../../services/products/products.context";
import { CustomInput } from "../../../components/utilities/custom-input.components";

export const ProductList = ({ product }) => {
	const { desc, name, unit, dist, stored, category, split, id } = product;
	const { myTheme, myFont, material } = useContext(AppSettingsContext);

	const [editProduct, setEditProduct] = useState({ product: { edit: false } });

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
				{(desc || editProduct.product.edit) && (
					<List.Item
						title="Description"
						titleStyle={titleStyle}
						right={() =>
							editProduct.product.edit && editProduct.product.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={desc}
									style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
								/>
							) : (
								<CustomText>{desc}</CustomText>
							)
						}
						borderless
						rippleColor="red"
						underlayColor="red"
					/>
				)}
				{(unit || editProduct.product.edit) && (
					<List.Item
						title="Unit"
						titleStyle={titleStyle}
						right={() =>
							editProduct.product.edit && editProduct.product.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={unit}
									style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
								/>
							) : (
								<CustomText>{unit}</CustomText>
							)
						}
					/>
				)}
				{(dist || editProduct.product.edit) && (
					<List.Item
						title="Distributor"
						titleStyle={titleStyle}
						right={() =>
							editProduct.product.edit && editProduct.product.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={dist}
									style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
								/>
							) : (
								<CustomText>{dist}</CustomText>
							)
						}
					/>
				)}
				{(stored || editProduct.product.edit) && (
					<List.Item
						title="Stored"
						titleStyle={titleStyle}
						right={() =>
							editProduct.product.edit && editProduct.product.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={stored}
									style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
								/>
							) : (
								<CustomText>{stored}</CustomText>
							)
						}
					/>
				)}
				{(category || editProduct.product.edit) && (
					<List.Item
						title="Category"
						titleStyle={titleStyle}
						right={() =>
							editProduct.product.edit && editProduct.product.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={category}
									style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
								/>
							) : (
								<CustomText>{category}</CustomText>
							)
						}
					/>
				)}
				{split || editProduct.product.edit ? (
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
						{editProduct.product.edit && editProduct.product.edit ? (
							<CustomButton
								label="Save"
								variant="themed"
								action={() =>
									setEditProduct({
										product: {
											id,
											edit: false,
										},
									})
								}
							/>
						) : (
							<CustomButton
								variant="themed"
								label="Edit"
								style={{ marginRight: 5 }}
								action={() => {
									setEditProduct({
										product: {
											id,
											edit: true,
										},
									});
									console.log(editProduct);
								}}
							/>
						)}
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
