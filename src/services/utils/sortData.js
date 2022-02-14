/**
 *
 * Util for sorting data alphabetically
 *
 */

export const sortData = (data) => {
	return data.sort((a, b) => a.name.localeCompare(b.name));
};

export const sortOrderData = (input) => {
	return input.sort((a, b) => {
		const x = a.data.name;
		const y = b.data.name;

		return x.localeCompare(y);
	});
};
