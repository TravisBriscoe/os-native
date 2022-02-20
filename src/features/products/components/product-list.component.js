import React, { useContext, useState } from "react";
import { List, Checkbox } from "react-native-paper";
import { ThemeContext } from "styled-components/native";
import { View, Alert } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomInput } from "../../../components/utilities/custom-input.components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { ProductsContext } from "../../../services/products/products.context";
import { OrderlistContext } from "../../../services/orderlist/orderlist.context";

export const ProductList = ({ product = {} }) => {
	const currentTheme = useContext(ThemeContext);
	const { myTheme, myFont, material } = useContext(AppSettingsContext);
	const { orderlist } = useContext(OrderlistContext);
	const { onDeleteProduct, onUpdateProduct, error, onAddProductToOrder } =
		useContext(ProductsContext);

	const { desc, name, unit, dist, stored, category, split, id } = product;
	const [editProduct, setEditProduct] = useState({ id, edit: false });

	const transferItems = () => {
		const dataObj = {};

		orderlist.map((item) => {
			const { id } = item;

			dataObj[id] = {
				...item,
			};
		});

		return dataObj;
	};

	const [addToOrderList, setAddToOrderList] = useState(transferItems());

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	return (
		<CustomView style={{ flexDirection: "row" }}>
			<List.Section style={{ width: "90%" }}>
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
					right={({ isExpanded }) => (
						<MaterialCommunityIcons
							name={isExpanded ? "chevron-up" : "chevron-down"}
							color={currentTheme.colors[myTheme][material].primary}
							size={24}
						/>
					)}
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
										status={
											!split
												? editProduct.split
													? "checked"
													: "unchecked"
												: split
												? "checked"
												: "unchecked"
										}
										onPress={() => setEditProduct({ ...editProduct, split: !split })}
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
									labelText
									variant="themed"
									label="Cancel"
									style={{ marginRight: 5 }}
									action={() => setEditProduct({ id, edit: false })}
								/>
							) : (
								<CustomButton
									labelText
									variant="themed"
									label="Edit"
									style={{ marginRight: 5 }}
									action={() => setEditProduct({ ...editProduct, edit: true })}
								/>
							)}
							{editProduct.edit ? (
								<>
									{error && <CustomText variant="error">{error}</CustomText>}
									<CustomButton
										labelText
										label="Save"
										variant="themed"
										action={() => {
											onUpdateProduct(editProduct.id, editProduct);
											setEditProduct({ id, edit: false });
										}}
									/>
								</>
							) : (
								<>
									{error && <CustomText variant="error">{error}</CustomText>}
									<CustomButton
										labelText
										variant="themed"
										label="Delete"
										style={{ marginLeft: 5 }}
										action={() => {
											Alert.alert(
												"Delete " + name + "?",
												"\nAre you sure?\nThis operation cannot be undone.",
												[
													{
														text: "Cancel",
														onPress: () => null,
													},
													{
														text: "Confirm",
														onPress: () => onDeleteProduct(product.id),
													},
												]
											);
										}}
									/>
								</>
							)}
						</View>
					</View>
				</List.Accordion>
			</List.Section>
			<CustomInput
				variant="themed"
				orientation="column"
				viewWidth="8%"
				style={{ padding: 5, textAlign: "right" }}
				viewStyle={{ paddingTop: 25 }}
				placeholder={!addToOrderList[id] ? "0" : addToOrderList[id].data.value.toString()}
				onChangeText={(text) => {
					setAddToOrderList({ [id]: { value: text } });
				}}
				onEndEditing={() => {
					onAddToOrderSheet(id, addToOrderList[id].value);
				}}
			/>
		</CustomView>
	);
};
