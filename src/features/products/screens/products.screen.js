import React, { useContext, useState } from "react";
import { FlatList } from "react-native";

import { CustomFab } from "../../../components/utilities/custom-fab.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomSearchbar } from "../../../components/utilities/custom-searchbar.component";
import { CustomSpinner } from "../../../components/utilities/custom-spinner.component";
import { ProductList } from "../components/product-list.component";
import { ProductsContext } from "../../../services/products/products.context";
import { objToArr } from "../../../services/utils/objtoarr";

export const ProductsScreen = ({ navigation }) => {
	const { products, isLoading } = useContext(ProductsContext);

	return (
		<CustomView>
			{isLoading && <CustomSpinner />}
			<CustomSearchbar />
			<CustomFab action={() => navigation.navigate("AddProduct")} />
			<FlatList data={products} renderItem={({ item }) => <ProductList product={item} />} />
		</CustomView>
	);
};
