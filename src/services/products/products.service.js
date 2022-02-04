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

export const deleteProduct = async (id) => {
	firestore()
		.collection("product-list")
		.doc(id)
		.delete()
		// .then(() => fetchProducts())
		.catch((err) => new Error("Error: " + err));

	fetchProducts();
};

export const updateProduct = async (id, data) => {
	firestore()
		.collection("product-list")
		.doc(id)
		.update(data)
		.then(() => fetchProducts())
		.catch((err) => new Error("Error: " + err));
};

export const addNewProduct = async (id, data) => {
	firestore()
		.collection("product-list")
		.doc(id)
		.set(data)
		.then(() => fetchProducts())
		.catch((err) => new Error("Error: " + err));
};
