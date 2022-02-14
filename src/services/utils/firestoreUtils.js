/**
 *
 * Firestore CRUD utils
 *
 */

import firestore from "@react-native-firebase/firestore";

export const addData = async (collection, id, data) => {
	firestore()
		.collection(collection)
		.doc(id)
		.set(data)
		.catch((err) => err);
};

export const deleteData = async (collection, id) => {
	firestore()
		.collection(collection)
		.doc(id)
		.delete()
		.catch((err) => err);
};

export const updateData = async (collection, id, data) => {
	firestore()
		.collection(collection)
		.doc(id)
		.update(data)
		.catch((err) => err);
};

export const deleteAll = async (collection) => {
	firestore()
		.collection(collection)
		.deelete()
		.catch((err) => err);
};

export const fetchCollection = async (collection) => {
	const dataObj = Object.create({});

	const collectionName =
		collection === "product-list"
			? "Product List"
			: collection === "order-list"
			? "Order Sheet"
			: collection === "recipe-list" && "Recipes List";

	try {
		await firestore()
			.collection(collection)
			.get()
			.then((querySnapshot) => {
				console.log(collection);
				querySnapshot.docs.map((doc) => {
					const { id } = doc.data();

					dataObj[id] = {
						...doc.data(),
					};

					return dataObj;
				});

				// return dataObj;
			});
	} catch (err) {
		console.log(`${collectionName} couldn't fetch: ${err.message}`);
		return err.message;
	}

	return dataObj;
};

const deleteOrderlist = async (data) => {
	data.map((el) => {
		firestore()
			.collection("order-list")
			.doc(el)
			.delete()
			.catch((err) => {
				console.log(`${collection} couldn't delete: ${err.message}`);
				return err.message;
			});
	});
};

export default firestoreUtils = {
	addData,
	updateData,
	deleteData,
	deleteAll,
	fetchCollection,
	deleteOrderlist,
};
