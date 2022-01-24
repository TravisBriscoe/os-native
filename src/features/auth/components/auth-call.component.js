import React, { useContext } from "react";

import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";

export const AuthCall = () => {
	const { loggedInUser, users } = useContext(AuthContext);

	return <>{loggedInUser ? <AppNav /> : <AuthNav />}</>;
};
