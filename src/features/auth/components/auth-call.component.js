import React, { useContext } from "react";

import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";
import { ProductsContextProvider } from "../../../services/products/products.context";

export const AuthCall = () => {
	const { loggedInUser, users } = useContext(AuthContext);

	return (
		<>
			{loggedInUser ? (
				<ProductsContextProvider>
					<AppNav />
				</ProductsContextProvider>
			) : (
				<AuthNav />
			)}
		</>
	);
};
