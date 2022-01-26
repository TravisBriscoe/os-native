import firestore from "@react-native-firebase/firestore";

export async function fetchUsersCollection() {
	const userDataObj = {};

	try {
		await firestore()
			.collection("user-list")
			.get()
			.then((querySnapshot) => {
				querySnapshot.docs.map((doc) => {
					const { id } = doc.data();

					userDataObj[id] = {
						...doc.data(),
					};
					return userDataObj;
				});
			});
	} catch (err) {
		console.log("User-list fetching failed: " + err.message);
		return err.message;
	}

	return userDataObj;
}
