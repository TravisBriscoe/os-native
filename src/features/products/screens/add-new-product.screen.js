import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";

import { CustomInput } from "../../../components/utilities/custom-input.components";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";
import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomButton } from "../../../components/utilities/custom-button.component";
import { CustomText } from "../../../components/utilities/custom-text.component";

import { ProductsContext } from "../../../services/products/products.context";

export const AddProduct = ({ navigation }) => {
	const [newName, setNewName] = useState("");
	const [newDesc, setNewDesc] = useState("");
	const [newDist, setNewDist] = useState("");
	const [newUnit, setNewUnit] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newStored, setNewStored] = useState("");
	const [newSplit, setNewSplit] = useState(false);

	const { products, onAddNewProduct, error, setError } = useContext(ProductsContext);

	return (
		<CustomView style={{ flexDirection: "column", justifyContent: "center" }}>
			<CustomView style={{ alignItems: "center", justifyContent: "center" }}>
				<CustomView
					style={{
						flexDirection: "row",
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<CustomView style={{ width: "20%" }}>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Name:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newName}
						onChangeText={(text) => setNewName(text)}
					/>
				</CustomView>
				<CustomDivider />
				<CustomView style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomView style={{ width: "20%" }}>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Description:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newDesc}
						onChangeText={(text) => setNewDesc(text)}
					/>
				</CustomView>
				<CustomDivider />
				<CustomView style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomView style={{ width: "20%" }}>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Distributor:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newDist}
						onChangeText={(text) => setNewDist(text)}
					/>
				</CustomView>
				<CustomDivider />
				<CustomView style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomView style={{ width: "20%" }}>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Unit:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newUnit}
						onChangeText={(text) => setNewUnit(text)}
					/>
				</CustomView>
				<CustomDivider />
				<CustomView style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomView>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Category:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newCategory}
						onChangeText={(text) => setNewCategory(text)}
					/>
				</CustomView>
				<CustomDivider />
				<CustomView style={{ flexDirection: "row", alignItems: "center" }}>
					<CustomView>
						<CustomText variant="themed" style={{ paddingLeft: 5 }}>
							Storage:
						</CustomText>
					</CustomView>
					<CustomInput
						viewWidth="75%"
						style={{ width: "95%", padding: 3 }}
						value={newStored}
						onChangeText={(text) => setNewStored(text)}
					/>
				</CustomView>
			</CustomView>
			{/* <CustomView> */}
			<View
				style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}
			>
				<CustomText>Split?</CustomText>
				<Checkbox
					status={newSplit ? "checked" : "unchecke"}
					onPress={() => setNewSplit(!newSplit)}
				/>
			</View>
			{/* </CustomView> */}
			<CustomDivider />
			<View style={{ flexDirection: "row", alignSelf: "center", paddingBottom: 10 }}>
				<CustomButton
					labelText
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
						return;
					}}
				/>
				<CustomDivider place="right" />
				<CustomButton
					labelText
					variant="themed"
					label="Save"
					action={() => {
						if (!newName || !newDist) return setError("Must have Name and Distributor!");

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

						onAddNewProduct(newItem.id, newItem);
						setError(null);
						if (!error) navigation.goBack();
					}}
				/>
				{error && <CustomText variant="error">{error}</CustomText>}
			</View>
		</CustomView>
	);
};
