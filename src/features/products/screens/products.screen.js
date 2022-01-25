import React, { useContext } from "react";
import { FlatList } from "react-native";
import { List } from "react-native-paper";
import { ThemeContext } from "styled-components/native";

import { ConstantView } from "../../../components/utilities/constantview.component";
import { Text } from "../../../components/utilities/text.component";

import { ProductsContext } from "../../../services/products/products.context";
import { AppSettingsContext } from "../../../services/app-settings/app-settings.context";

export const ProductsScreen = () => {
	const { products } = useContext(ProductsContext);
	const { myTheme, myFont, material } = useContext(AppSettingsContext);
	const currentTheme = useContext(ThemeContext);

	const titleStyle = {
		backgroundColor: currentTheme.colors[myTheme][material].secondary,
		color: currentTheme.colors[myTheme][material].primary,
		fontFamily: currentTheme.fonts[myFont],
	};

	return (
		<ConstantView>
			<FlatList
				data={products}
				renderItem={({ item }) => (
					<List.Section>
						{item.desc ? (
							<List.Accordion
								title={<Text>{item.name}</Text>}
								description={
									<Text style={{ fontSize: currentTheme.fontSizes[1] }}>{item.desc}</Text>
								}
								titleStyle={{
									fontSize: currentTheme.fontSizes[6],
								}}
								style={titleStyle}
							>
								<List.Item
									title="Description"
									titleStyle={titleStyle}
									right={() => <Text>{item.desc}</Text>}
									borderless
									rippleColor="red"
									underlayColor="red"
								/>
								<List.Item
									title="Unit"
									titleStyle={titleStyle}
									right={() => <Text>{item.unit}</Text>}
								/>
								<List.Item
									title="Distributor"
									titleStyle={titleStyle}
									right={() => <Text>{item.dist}</Text>}
								/>
								<List.Item
									title="Stored"
									titleStyle={titleStyle}
									right={() => <Text>{item.stored}</Text>}
								/>
								<List.Item
									title="Category"
									titleStyle={titleStyle}
									right={() => <Text>{item.category}</Text>}
								/>
								<List.Item
									title="Split"
									titleStyle={titleStyle}
									right={() => <Text>{item.split ? "yes" : "no"}</Text>}
								/>
							</List.Accordion>
						) : (
							<List.Accordion
								title={<Text>{item.name}</Text>}
								titleStyle={{
									fontSize: currentTheme.fontSizes[6],
								}}
								style={titleStyle}
							>
								<List.Item
									title="Unit"
									titleStyle={titleStyle}
									right={() => <Text>{item.unit}</Text>}
								/>
								<List.Item
									title="Distributor"
									titleStyle={titleStyle}
									right={() => <Text>{item.dist}</Text>}
								/>
								<List.Item
									title="Stored"
									titleStyle={titleStyle}
									right={() => <Text>{item.stored}</Text>}
								/>
								<List.Item
									title="Category"
									titleStyle={titleStyle}
									right={() => <Text>{item.category}</Text>}
								/>
								<List.Item
									title="Split"
									titleStyle={titleStyle}
									right={() => <Text>{item.split ? "yes" : "no"}</Text>}
								/>
							</List.Accordion>
						)}
					</List.Section>
				)}
			/>
		</ConstantView>
	);
};
