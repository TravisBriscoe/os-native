import React, { useState, useEffect } from "react";
import Netinfo from "@react-native-community/netinfo";
import { Text, View } from "react-native";

import { AuthCall } from "../../auth/components/auth-call.component";

export const Splash = (props) => {
	const [network, setNetwork] = useState(true);

	useEffect(() => {
		Netinfo.addEventListener((state) => {
			setNetwork(state.isInternetReachable);
		});

		console.log(network);
	}, [network]);

	return (
		<>
			{!network ? (
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text>No network connectivity!</Text>
					<Text>Connect to the internet...</Text>
				</View>
			) : (
				<AuthCall {...props} />
			)}
		</>
	);
};
