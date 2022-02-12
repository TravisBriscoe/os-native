import React from "react";

import { CustomIcon } from "../../../components/utilities/custom-icon.component";
import { CustomText } from "../../../components/utilities/custom-text.component";
import { CustomView } from "../../../components/utilities/custom-views.component";

export const CustomHeader = (props) => {
	return (
		<CustomView style={{ ...props.style }}>
			<CustomIcon variant="themed" name="arrow-back" action={() => props.navigation.goBack()} />
			<CustomText variant="body">{props.title}</CustomText>
		</CustomView>
	);
};
