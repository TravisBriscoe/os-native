import React, { useContext } from "react";
import { FlatList, RefreshControl } from "react-native";

import { CustomFab } from "../../../components/utilities/custom-fab.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomSearchbar } from "../../../components/utilities/custom-searchbar.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { ProductList } from "../components/product-list.component";
import { ProductsContext } from "../../../services/products/products.context";
import { OrderlistContext } from "../../../services/orderlist/orderlist.context";
import { AppContext } from "../../../services/app/app.context";

export const ProductsScreen = ({ navigation }) => {
	const { products, isRefreshing, fetchProducts } = useContext(ProductsContext);
	const { fetchOrderlist } = useContext(OrderlistContext);
	const { isLoading, error } = useContext(AppContext);

	return (
		<CustomView>
			{isLoading && <CustomSpinner />}
			<CustomSearchbar />
			<CustomFab action={() => navigation.navigate("AddProduct")} />
			<FlatList
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
		</CustomView>
	);
};
