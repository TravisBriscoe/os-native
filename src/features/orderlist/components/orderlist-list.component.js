import React, { useState, useContext } from "react";

import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomIcon } from "../../../components/utilities/custom-icon.component";
import { CustomText } from "../../../components/utilities/custom-text.component";

import { OrderlistContext } from "../../../services/orderlist/orderlist.context";

export const OrderList = ({ order }) => {
	const { onUpdateOrder, onRemoveFromOrder } = useContext(OrderlistContext);

	const [item, setItem] = useState(order);

	const {
		id,
		data: { name },
	} = order;

	const {
		data: { value },
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
						disabled={value <= 1 ? true : false}
						style={{ paddingRight: 5 }}
						variant="themed"
						size={25}
						name="arrow-down"
						action={() => {
							let count = +value - 1;

							setItem({
								...item,
								data: { value: count },
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
					<CustomText variant="body">{value}</CustomText>
					<CustomIcon
						disabled={value >= 9 ? true : false}
						style={{ marginLeft: 5 }}
						size={25}
						variant="themed"
						name={"arrow-up"}
						action={() => {
							const count = +value + 1;

							setItem({
								...item,
								data: { value: count },
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
							onRemoveFromOrder(item.id);
						}}
					/>
				</CustomView>
			</CustomView>
		</>
	);
};
