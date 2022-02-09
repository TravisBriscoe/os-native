import React, { useContext } from "react";

import { CustomMainView } from "../../../components/utilities/custom-views.component";
import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";

export const AuthCall = () => {
	const { loggedInUser } = useContext(AuthContext);

	return <CustomMainView>{loggedInUser ? <AppNav /> : <AuthNav />}</CustomMainView>;
};
