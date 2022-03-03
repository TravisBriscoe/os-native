import React, { useContext, useState, useEffect } from "react";
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
	const { orderlist, onAddToOrder, onUpdateOrder, onRemoveFromOrder } =
		useContext(OrderlistContext);
	const { onDeleteProduct, onUpdateProduct, error, products } = useContext(ProductsContext);

	const { desc, name, unit, dist, stored, category, split, id } = product;
	const [editProduct, setEditProduct] = useState({ id, edit: false });

	transferItems = () => {
		const dataObj = {};

		if (!orderlist) return {};
		else if (orderlist.length) {
			orderlist.map((item) => {
				const { id } = item;

				dataObj[id] = {
					...item,
				};
			});

			return dataObj;
		}

		return dataObj;
	};

	const productIsExpanded = () => {
		const dataObj = {};

		products.map((item) => {
			const { id } = item;

			dataObj[id] = { id, isExpanded: false };
		});

		return dataObj;
	};

	const [isProductExpanded, setIsProductExpanded] = useState(false);

	// const changeExpanded = (oldId) => {
	// 	const oldData = Object.entries(isProductExpanded).map((el) => {
	// 		const exitData = {};

	// 		if (el[1].id !== oldId) {
	// 			exitData[el[1].id] = { id: el[1].id, isExpanded: false };
	// 		} else return;

	// 		return Object.assign({}, exitData);
	// 	});

	// 	const newData = Object.entries(isProductExpanded).filter((el) => {
	// 		const exitData = {};

	// 		if (el[1].id === oldId) {
	// 			exitData[el[1].id] = { id: el[1].id, isExpanded: !el[1].isExpanded };
	// 		} else return undefined;

	// 		return exitData;
	// 	});

	// 	const allData = { ...newData, ...oldData };

	// 	setIsProductExpanded({
	// 		allData,
	// 	});
	// };

	const changeExpanded = (oldId) => {
		if (isProductExpanded !== oldId) {
			setIsProductExpanded(oldId);
		} else setIsProductExpanded("");

		forceUpdate();
	};

	const [count, setCount] = useState(0);

	const forceUpdate = () => {
		let newCount = count + 1;
		setCount(newCount);
	};

	const [addToOrderList, setAddToOrderList] = useState(transferItems());

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	return (
		<CustomView style={{ flex: 1, flexDirection: "row" }}>
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
					expanded={isProductExpanded}
					onPress={() => {
						setIsProductExpanded((prevState) => !prevState);
					}}
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
										variant="themed"
										orientation="column"
										inputWidth="80%"
										viewWidth="50%"
										placeholder={desc}
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											textAlign: "right",
											paddingRight: 2,
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
										variant="themed"
										orientation="column"
										inputWidth="80%"
										viewWidth="50%"
										placeholder={unit}
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											textAlign: "right",
											paddingRight: 2,
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
										variant="themed"
										orientation="column"
										inputWidth="80%"
										viewWidth="50%"
										placeholder={dist}
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											textAlign: "right",
											paddingRight: 2,
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
										variant="themed"
										orientation="column"
										inputWidth="80%"
										viewWidth="50%"
										placeholder={stored}
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											textAlign: "right",
											paddingRight: 2,
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
										variant="themed"
										orientation="column"
										inputWidth="80%"
										viewWidth="50%"
										placeholder={category}
										style={{
											flex: 1,
											alignItems: "center",
											justifyContent: "center",
											textAlign: "right",
											paddingRight: 2,
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
				keyboardType="numeric"
				onChangeText={(text) => {
					if (!addToOrderList || !addToOrderList[id]) {
						setAddToOrderList({ [id]: { data: { id, name, value: text }, id } });
						setTimeout(() => {
							onAddToOrder(id, {
								data: {
									id,
									name,
									value: text,
								},
								id,
							});
						}, 500);
					}
					if (text !== 0) {
						setAddToOrderList({
							...(addToOrderList[id] && { data: { ...addToOrderList[id].data, value: text } }),
							id,
						});
						setTimeout(() => {
							onUpdateOrder(id, { data: { id, name, value: text }, id });
						}, 500);
					}
					if (text === "0") {
						onRemoveFromOrder(addToOrderList[id].id);
					}
				}}
				// onEndEditing={(text) => {
				// 	console.log(text);
				// 	onAddProductToOrder(id, addToOrderList[id].value);
				// }}
			/>
		</CustomView>
	);
};
