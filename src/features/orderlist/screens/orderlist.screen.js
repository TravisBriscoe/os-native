import React, { useContext, useState } from "react";
import { FlatList, Alert, RefreshControl } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomIcon } from "../../../components/utilities/custom-icon.component";

import { ProductsContext } from "../../../services/products/products.context";
import { objToArr } from "../../../services/utils/objtoarr";
import { sortOrderData } from "../../../services/utils/sortData";
import { CustomButton } from "../../../components/utilities/custom-button.component";

export const OrderListScreen = () => {
	const {
		isLoading,
		setIsLoading,
		orderlist,
		onRemoveFromOrder,
		onUpdateOrder,
		onDeleteOrderlist,
		fetchOrderlist,
	} = useContext(ProductsContext);
	const [orderValue, setOrderValue] = useState(orderlist);

	const orderSheet = sortOrderData(objToArr(orderlist));
	console.log(orderSheet);

	return (
		<>
			{isLoading && <CustomSpinner />}
			<CustomView>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => {
								setIsLoading(true);
								fetchOrderlist().then(() => {
									setTimeout(() => {
										setIsLoading(false);
									});
								});
							}}
						/>
					}
					data={orderSheet}
					ListEmptyComponent={
						<>
							<CustomText variant="body">No products on Order!</CustomText>
							<CustomText variant="body">Please add products on the Products Screen</CustomText>
						</>
					}
					renderItem={({ item }) => {
						const {
							data: { name, id },
						} = item;

						return (
							<>
								<CustomView style={{ flexDirection: "row" }}>
									<CustomView>
										<CustomText variant="body" style={{ paddingLeft: 10 }}>
											{name}
										</CustomText>
									</CustomView>
									<CustomView
										style={{
											flexDirection: "row",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<CustomIcon
											disabled={orderValue[id].data.value <= 1 ? true : false}
											style={{ paddingRight: 5 }}
											variant="themed"
											size={25}
											name="arrow-down"
											action={() => {
												let count = +orderValue[id].data.value - 1;

												setOrderValue({
													...orderValue,
													[id]: { data: { value: count } },
												});

												onUpdateOrder(id, {
													data: {
														id,
														name,
														value: count,
													},
													id,
												});
											}}
										/>
										<CustomText variant="body">{orderValue[id].data.value}</CustomText>
										<CustomIcon
											disabled={orderValue[id].data.value >= 9 ? true : false}
											style={{ marginLeft: 5 }}
											size={25}
											variant="themed"
											name={"arrow-up"}
											action={() => {
												const count = +orderValue[id].data.value + 1;

												setOrderValue({
													...orderValue,
													[id]: { data: { value: count } },
												});

												onUpdateOrder(id, {
													data: {
														id,
														name,
														value: count,
													},
													id,
												});
											}}
										/>
										<CustomIcon
											name="close-sharp"
											variant="themed"
											size={30}
											style={{ paddingLeft: 10 }}
											action={() => {
												onRemoveFromOrder(orderValue[id].id);
											}}
										/>
									</CustomView>
								</CustomView>
							</>
						);
					}}
					keyExtractor={(item) => item.data.id}
				/>
			</CustomView>
			{orderSheet.length > 0 && (
				<CustomView style={{ flex: 0.2, alignItems: "flex-end", justifyContent: "flex-end" }}>
					<CustomButton
						labelText
						variant="themed"
						style={{ marginRight: 10, marginBottom: 10 }}
						label="Clear"
						action={() => {
							Alert.alert(
								"Delete entire order list?",
								"\nAre you sure?\nThis operation cannot be undone.",
								[
									{
										text: "Cancel",
										onPress: () => null,
									},
									{
										text: "Confirm",
										onPress: () => {
											let newData = [];
											const allData = orderSheet.map((el) => {
												newData.push(el.id);
											});

											onDeleteOrderlist(newData);
										},
									},
								]
							);
						}}
					/>
				</CustomView>
			)}
		</>
		// 	) : (
		// 		<CustomView
		// 			style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}
		// 		>
		// 			<CustomText>No products on Order!</CustomText>
		// 		</CustomView>
		// 	)}
		// </>
		// };
	);
};
