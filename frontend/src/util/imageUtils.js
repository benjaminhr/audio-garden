function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function getImageUrls() {
	const searchTerm = 'gardens';
	const UNSPLASH_ACCESS_KEY = 'SBrPUgoNaYq2WdmrErTfWSOkFxtcaR29WegUj7WYJmA';
	const totalPages = 5;
	const perPage = 30;
	const randomPage = Math.floor(Math.random() * totalPages) + 1;

	const endpoint = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=${perPage}&page=${randomPage}`;

	return fetch(endpoint)
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then((data) => {
			if (data.total === 0) {
				alert('No photos were found for your search query.');
				return;
			}

			return data.results;
		})
		.catch(() => alert('An error occured!'));
}

export { shuffle, getImageUrls };
