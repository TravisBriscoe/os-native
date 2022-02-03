import React, { useContext, useState, useEffect } from "react";
import { List, Checkbox } from "react-native-paper";
import { ThemeContext } from "styled-components/native";
import { View, Alert } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { ProductsContext } from "../../../services/products/products.context";
import { CustomInput } from "../../../components/utilities/custom-input.components";

export const ProductList = ({ product }) => {
	const { desc, name, unit, dist, stored, category, split, id } = product;
	const [editProduct, setEditProduct] = useState({ id, edit: false });

	const { myTheme, myFont, material } = useContext(AppSettingsContext);
	const { deleteProduct } = useContext(ProductsContext);
	const currentTheme = useContext(ThemeContext);

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	// useEffect(() => {
	// 	console.log(editProduct);
	// }, [editProduct]);

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
				{(desc || editProduct.edit) && (
					<List.Item
						title="Description"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={desc}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
										textAlign: "right",
									}}
									onChangeText={(text) =>
										setEditProduct({
											...editProduct,
											desc: text,
										})
									}
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
				{(unit || editProduct.edit) && (
					<List.Item
						title="Unit"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={unit}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
										textAlign: "right",
									}}
									onChangeText={(text) =>
										setEditProduct({
											...editProduct,
											unit: text,
										})
									}
								/>
							) : (
								<CustomText>{unit}</CustomText>
							)
						}
					/>
				)}
				{(dist || editProduct.edit) && (
					<List.Item
						title="Distributor"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={dist}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
										textAlign: "right",
									}}
									onChangeText={(text) =>
										setEditProduct({
											...editProduct,
											dist: text,
										})
									}
								/>
							) : (
								<CustomText>{dist}</CustomText>
							)
						}
					/>
				)}
				{(stored || editProduct.edit) && (
					<List.Item
						title="Stored"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={stored}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
										textAlign: "right",
									}}
									onChangeText={(text) =>
										setEditProduct({
											...editProduct,
											stored: text,
										})
									}
								/>
							) : (
								<CustomText>{stored}</CustomText>
							)
						}
					/>
				)}
				{(category || editProduct.edit) && (
					<List.Item
						title="Category"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<CustomInput
									orientation="column"
									inputWidth="80%"
									viewWidth="75%"
									placeholder={category}
									style={{
										flex: 1,
										alignItems: "center",
										justifyContent: "center",
										textAlign: "right",
									}}
									onChangeText={(text) =>
										setEditProduct({
											...editProduct,
											category: text,
										})
									}
								/>
							) : (
								<CustomText>{category}</CustomText>
							)
						}
					/>
				)}
				{split || editProduct.edit ? (
					<List.Item
						title="Split"
						titleStyle={titleStyle}
						right={() =>
							editProduct.edit ? (
								<Checkbox
									status={editProduct.split ? "checked" : "unchecked"}
									onPress={() => setEditProduct({ ...editProduct, split: !editProduct.split })}
								/>
							) : (
								<CustomText style={{ color: "green", fontStyle: "italic" }}>Yes!</CustomText>
							)
						}
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
						{editProduct.edit ? (
							<CustomButton
								variant="themed"
								label="Cancel"
								style={{ marginRight: 5 }}
								action={() => setEditProduct({ id, edit: false })}
							/>
						) : (
							<CustomButton
								variant="themed"
								label="Edit"
								style={{ marginRight: 5 }}
								action={() => setEditProduct({ ...editProduct, edit: true })}
							/>
						)}
						{editProduct.edit ? (
							<CustomButton
								label="Save"
								variant="themed"
								action={() => setEditProduct({ ...editProduct, edit: false })}
							/>
						) : (
							<CustomButton
								variant="themed"
								label="Delete"
								style={{ marginLeft: 5 }}
								action={() => {
									Alert.alert(
										"Delete " + name + "?",
										"\nAre you sure?\nThis operation cannot be undone.",
										[
											{
												text: "Confirm",
												onPress: () => deleteProduct(product.id),
											},
											{
												text: "Cancel",
												onPress: () => null,
											},
										]
									);
								}}
							/>
						)}
					</View>
				</View>
			</List.Accordion>
		</List.Section>
	);
};
