/**
 *
 * Custom header for use in Stack Navigators
 *
 */

import React from "react";

import { CustomIcon } from "./custom-icon.component";
import { CustomView } from "./custom-views.component";

export const CustomHeader = ({ navigation }) => {
	return (
		<CustomView header style={{ height: 30 }}>
			<CustomIcon variant="themed" name="arrow-back" action={() => navigation.goBack()} />
		</CustomView>
	);
};
