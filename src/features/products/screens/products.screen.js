import React, { useContext, useRef } from "react";
import { FlatList, RefreshControl, KeyboardAvoidingView, Platform } from "react-native";

import { CustomFab } from "../../../components/utilities/custom-fab.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomSearchbar } from "../../../components/utilities/custom-searchbar.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { ProductList } from "../components/product-list.component";

import { ProductsContext } from "../../../services/products/products.context";
import { OrderlistContext } from "../../../services/orderlist/orderlist.context";

export const ProductsScreen = ({ navigation }) => {
	const { products, isRefreshing, fetchProducts, isLoading, error } = useContext(ProductsContext);
	const { fetchOrderlist } = useContext(OrderlistContext);

	const scrollRef = useRef();

	return (
		<CustomView>
			<CustomSearchbar />
			{isLoading && <CustomSpinner />}
			{error && <CustomText variant="error">{error}</CustomText>}
			<CustomFab type="plus" action={() => navigation.navigate("AddProduct")} />
			<CustomFab
				style={{
					position: "absolute",
					bottom: 10,
					left: 10,
					right: 340,
					borderRadius: 50,
					elevation: 3,
					zIndex: 3,
				}}
				type="arrow-up"
				action={() => scrollRef.current.scrollToOffset({ x: 0, y: 0 })}
			/>
			<FlatList
				ref={scrollRef}
				data={products}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={() => {
							fetchProducts();
							fetchOrderlist();
						}}
					/>
				}
				renderItem={({ item }) => <ProductList product={item} />}
			/>
			<CustomDivider place="bottom" size="xxxlg" />
		</CustomView>
	);
};
