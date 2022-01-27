import React, { useContext } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { ThemeContext } from "styled-components/native";

import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";

import { ProductsContext } from "../../../services/products/products.context";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";
import { Spinner } from "../../../components/utilities/activity-spinner.component";

export const ProductsScreen = () => {
	const { products, isLoading } = useContext(ProductsContext);
	const { myTheme, myFont, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	return (
		<CustomView>
			{isLoading && <Spinner />}
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<List.Section>
						{item.desc ? (
							<List.Accordion
								title={<CustomText>{item.name}</CustomText>}
								description={
									<CustomText variant="caption" style={{ fontSize: currentTheme.fontSizes[1] }}>
										{item.desc}
									</CustomText>
								}
								descriptionNumberOfLines={1}
								titleStyle={{
									fontSize: currentTheme.fontSizes[6],
								}}
								style={titleStyle}
							>
								<List.Item
									title="Description"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.desc}</CustomText>}
									borderless
									rippleColor="red"
									underlayColor="red"
								/>
								<List.Item
									title="Unit"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.unit}</CustomText>}
								/>
								<List.Item
									title="Distributor"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.dist}</CustomText>}
								/>
								<List.Item
									title="Stored"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.stored}</CustomText>}
								/>
								<List.Item
									title="Category"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.category}</CustomText>}
								/>
								<List.Item
									title="Split"
									titleStyle={titleStyle}
									right={() => (
										<CustomText
											style={{ color: item.split ? "green" : "red", fontStyle: "italic" }}
										>
											{item.split ? "Yes!" : "No!"}
										</CustomText>
									)}
								/>
							</List.Accordion>
						) : (
							<List.Accordion
								title={<CustomText>{item.name}</CustomText>}
								titleStyle={{
									fontSize: currentTheme.fontSizes[6],
								}}
								style={titleStyle}
							>
								<List.Item
									title="Unit"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.unit}</CustomText>}
								/>
								<List.Item
									title="Distributor"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.dist}</CustomText>}
								/>
								<List.Item
									title="Stored"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.stored}</CustomText>}
								/>
								<List.Item
									title="Category"
									titleStyle={titleStyle}
									right={() => <CustomText>{item.category}</CustomText>}
								/>
								<List.Item
									title="Split"
									titleStyle={titleStyle}
									right={() => (
										<CustomText
											style={{ color: item.split ? "green" : "red", fontStyle: "italic" }}
										>
											{item.split ? "Yes!" : "No!"}
										</CustomText>
									)}
								/>
							</List.Accordion>
						)}
					</List.Section>
				)}
			/>
		</CustomView>
	);
};
