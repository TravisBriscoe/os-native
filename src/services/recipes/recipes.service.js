import firestore from "@react-native-firebase/firestore";

export const fetchRecipes = async () => {
	const recipeDataObj = Object.create({});

	firestore()
		.collection("recipe-list")
		.get()
		.then((querySnapshot) => {
			querySnapshot.docs.map((doc) => {
				const { id } = doc.data();

				recipeDataObj[id] = {
					...doc.data(),
				};

				return recipeDataObj;
			});

			return recipeDataObj;
		})
		.catch((err) => {
			console.log("recipes error: " + err);
			return err;
		});

	return recipeDataObj;
};
