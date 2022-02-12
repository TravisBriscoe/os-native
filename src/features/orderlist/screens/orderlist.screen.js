import React, { useContext, useState } from "react";
import { FlatList } from "react-native";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomIcon } from "../../../components/utilities/custom-icon.component";

import { ProductsContext } from "../../../services/products/products.context";
import { objToArr } from "../../../services/utils/objtoarr";

export const OrderListScreen = () => {
	const { isLoading, orderlist, onRemoveFromOrder, onUpdateOrder } = useContext(ProductsContext);
	const [orderValue, setOrderValue] = useState(orderlist);

	const orderSheet = objToArr(orderlist);

	return (
		<CustomView style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
			{isLoading && <CustomSpinner />}
			{orderSheet.length !== 0 ? (
				<FlatList
					data={orderSheet}
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
			) : (
				<CustomText>No products on Order!</CustomText>
			)}
		</CustomView>
	);
};
