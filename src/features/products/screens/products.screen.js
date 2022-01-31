import React, { useContext } from "react";
import { FlatList } from "react-native";

import { CustomView } from "../../../components/utilities/custom-views.component";

import { ProductsContext } from "../../../services/products/products.context";
import { Spinner } from "../../../components/utilities/activity-spinner.component";
import { ProductList } from "../components/product-list.component";

export const ProductsScreen = () => {
	const { products, isLoading } = useContext(ProductsContext);

	return (
		<CustomView>
			{isLoading && <Spinner />}
			<FlatList data={products} renderItem={({ item }) => <ProductList product={item} />} />
		</CustomView>
	);
};
