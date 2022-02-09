import React, { useContext, useState } from "react";

import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { ProductsContext } from "../../../services/products/products.context";
import { objToArr } from "../../../services/utils/objtoarr";

export const OrderListScreen = () => {
	const { orderList } = useContext(ProductsContext);

	return (
		<CustomView>
			<CustomText variant="themed">Order List</CustomText>
			{objToArr(orderList).map((el, index) => {
				return (
					<CustomView key={index}>
						<CustomText variant="theme">{el.data.name}</CustomText>
						<CustomText variant="theme">{el.data.value}</CustomText>
					</CustomView>
				);
			})}
		</CustomView>
	);
};
