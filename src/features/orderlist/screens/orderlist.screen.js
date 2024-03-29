import React, { useContext } from "react";
import { FlatList, Alert, RefreshControl, ScrollView } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomButton } from "../../../components/utilities/custom-button.component";

import { OrderList } from "../components/orderlist-list.component";
import { OrderlistContext } from "../../../services/orderlist/orderlist.context";

export const OrderListScreen = () => {
	const { orderlist, onDeleteOrderlist, fetchOrderlist, isRefreshing, isLoading, error } =
		useContext(OrderlistContext);

	if (!orderlist.length) {
		return (
			<CustomView style={{ alignItems: "center", justifyContent: "center" }}>
				<CustomText style={{ textAlign: "center" }} variant="body">
					No products on Order!
				</CustomText>
				<CustomText variant="body" style={{ textAlign: "center" }}>
					Please add products on the Products Screen
				</CustomText>
			</CustomView>
		);
	}

	return (
		<CustomView>
			{isLoading && <CustomSpinner />}
			{error && <CustomText variant="error">{error}</CustomText>}
			<CustomDivider size="xlg" />
			<FlatList
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							fetchOrderlist();
						}}
					/>
				}
				data={orderlist}
				ListEmptyComponent={
					<>
						<CustomView style={{ height: "100%", alignItems: "center", justifyContent: "center" }}>
							<CustomText style={{ textAlign: "center" }} variant="body">
								No products on Order!
							</CustomText>
							<CustomText variant="body" style={{ textAlign: "center" }}>
								Please add products on the Products Screen
							</CustomText>
						</CustomView>
					</>
				}
				renderItem={({ item }) => <OrderList order={item} />}
			/>
			{orderlist.length > 0 && (
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
											const allData = orderlist.map((el) => {
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
		</CustomView>
	);
};
