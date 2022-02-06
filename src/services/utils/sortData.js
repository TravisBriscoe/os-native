/**
 *
 * Util for sorting data alphabetically
 *
 */

export const sortData = (data) => {
	return data.sort((a, b) => a.name.localeCompare(b.name));
};
