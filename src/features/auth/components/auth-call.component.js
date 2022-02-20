import React, { useContext } from "react";

import { CustomMainView } from "../../../components/utilities/custom-views.component";
import { ProductsContextProvider } from "../../../services/products/products.context";
import { AuthNav } from "../../../infrastructure/navigators/auth.navigator";
import { AppNav } from "../../../infrastructure/navigators/app.navigator";
import { AuthContext } from "../../../services/auth/auth.context";
import { OrderlistContextProvider } from "../../../services/orderlist/orderlist.context";
import { RecipesContextProvider } from "../../../services/recipes/recipes.context";

export const AuthCall = () => {
	const { loggedInUser } = useContext(AuthContext);

	return (
		<CustomMainView>
			{loggedInUser ? (
				<ProductsContextProvider>
					<OrderlistContextProvider>
						<RecipesContextProvider>
							<AppNav />
						</RecipesContextProvider>
					</OrderlistContextProvider>
				</ProductsContextProvider>
			) : (
				<AuthNav />
			)}
		</CustomMainView>
	);
};
