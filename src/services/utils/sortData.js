export const sortData = (data) => {
	return data.sort((a, b) => a.name.localeCompare(b.name));
};
