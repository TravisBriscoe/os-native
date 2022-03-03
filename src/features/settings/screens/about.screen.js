import React, { useContext } from "react";
import { openURL } from "expo-linking";

import { CustomView } from "../../../components/utilities/custom-views.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomDivider } from "../../../components/utilities/custom-divider.component";

export const AboutScreen = () => {
	return (
		<CustomView>
			<CustomView style={{ flexDirection: "column", justifyContent: "center", marginLeft: 20 }}>
				<CustomText>Built using React Native, React Native Paper, and StyledComponents</CustomText>
				<CustomDivider />
				<CustomView header>
					<CustomText>Icon and splash screen from </CustomText>
					<CustomText
						variant="link"
						onPress={() => openURL("https://www.freeiconspng.com/img/13712")}
					>
						Restaurant Chef Icon
					</CustomText>
				</CustomView>
				<CustomDivider />
				<CustomView header style={{ flexDirection: "row", alignSelf: "center" }}>
					<CustomText>&copy;2022 </CustomText>
					<CustomText>Travis Briscoe</CustomText>
				</CustomView>
			</CustomView>
			<CustomView
				header
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					alignSelf: "center",
					marginBottom: 10,
					marginRight: 10,
				}}
			>
				<CustomText variant="link" onPress={() => openURL("mailto://travis.briscoe@gmail.com")}>
					Contact
				</CustomText>
				<CustomDivider place="right" />
				<CustomText>&bull;</CustomText>
				<CustomDivider place="right" />
				<CustomText variant="link" onPress={() => openURL("https://www.travisbriscoe.ca")}>
					Homepage
				</CustomText>
				<CustomDivider place="right" />
				<CustomText>&bull;</CustomText>
				<CustomDivider place="right" />
				<CustomText variant="link" onPress={() => openURL("https://github.com/TravisBriscoe")}>
					Github
				</CustomText>
			</CustomView>
		</CustomView>
	);
};
