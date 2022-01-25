export const objToArr = (input) => {
	newArr = Object.keys(input).map((key) => {
		input[key].id = key;
		return input[key];
	});

	return newArr;
};
