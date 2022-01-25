import firestore from "@react-native-firebase/firestore";

export const fetchProducts = async () => {
	const productDataObj = Object.create({});

	try {
		await firestore()
			.collection("product-list")
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.map((doc) => {
					const { id } = doc.data();

					productDataObj[id] = {
						...doc.data(),
					};

					return productDataObj;
				});

				return productDataObj;
			});
	} catch (err) {
		console.log("Product list fetching failed: " + err.message);
		return err.message;
	}

	return productDataObj;
};
