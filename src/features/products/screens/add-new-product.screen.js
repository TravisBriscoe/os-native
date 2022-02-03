import React, { useContext, useState } from "react";
import { View } from "react-native";

import { CustomInput } from "../../../components/utilities/custom-input.components";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { Checkbox } from "react-native-paper";
import { CustomText } from "../../../components/utilities/custom-text.component";

import { ProductsContext } from "../../../services/products/products.context";
import { deleteProduct } from "../../../services/products/products.service";

export const AddProduct = () => {
	const [newName, setNewName] = useState("");
	const [newDesc, setNewDesc] = useState("");
	const [newDist, setNewDist] = useState("");
	const [newUnit, setNewUnit] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newStored, setNewStored] = useState("");
	const [newSplit, setNewSplit] = useState(false);

	const { products } = useContext(ProductsContext);

	return (
		<CustomView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="85%"
				variant="themed"
				label="Name:"
				value={newName}
				onChangeText={(text) => setNewName(text)}
			/>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="75%"
				variant="themed"
				label="Description:"
				value={newDesc}
				onChangeText={(text) => setNewDesc(text)}
			/>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="90%"
				variant="themed"
				label="Unit:"
				value={newUnit}
				onChangeText={(text) => setNewUnit(text)}
			/>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="75%"
				variant="themed"
				label="Distributor:"
				value={newDist}
				onChangeText={(text) => setNewDist(text)}
			/>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="80%"
				variant="themed"
				label="Category:"
				value={newCategory}
				onChangeText={(text) => setNewCategory(text)}
			/>
			<CustomInput
				style={{ borderWidth: 1, paddingLeft: 5, paddingTop: 3, paddingBottom: 3 }}
				viewWidth="95%"
				inputWidth="85%"
				variant="themed"
				label="Stored:"
				value={newStored}
				onChangeText={(text) => setNewStored(text)}
			/>
			<CustomDivider />
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CustomText variant="theme">Split?</CustomText>
				<CustomDivider place="right" />
				<Checkbox
					status={newSplit ? "checked" : "unchecked"}
					onPress={() => setNewSplit(!newSplit)}
				/>
			</View>
			<CustomDivider />
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<CustomButton
					label="Clear"
					variant="themed"
					action={() => {
						setNewCategory("");
						setNewDesc("");
						setNewDist("");
						setNewUnit("");
						setNewName("");
						setNewStored("");
						setNewSplit(false);
					}}
				/>
				<CustomDivider place="right" />
				<CustomButton
					variant="themed"
					label="Save"
					action={() => {
						const newItem = {
							name: newName,
							desc: newDesc,
							unit: newUnit,
							stored: newStored,
							split: newSplit,
							category: newCategory,
							dist: newDist,
							id: `U${products.length + 1}`,
						};
						// addNewProduct(newItem.id, newItem);
					}}
				/>
			</View>
		</CustomView>
	);
};
