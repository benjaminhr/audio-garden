function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}

	return array;
}

function getImages(searchTerm) {
	const UNSPLASH_ACCESS_KEY = 'SBrPUgoNaYq2WdmrErTfWSOkFxtcaR29WegUj7WYJmA';
	const perPage = 10;

	const endpoint = `https://api.unsplash.com/photos/random?query=${searchTerm}&client_id=${UNSPLASH_ACCESS_KEY}&count=${perPage}`;

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

			return data;
		})
		.catch(() => alert('An error occured!'));
}

async function getImageUrls() {
	const searchTerms = ['garden', 'sandy garden', 'fluffy textures', 'cabin'];
	const promises = searchTerms.map(getImages);
	const images = await Promise.all(promises);
	const uniqueImages = images.flat().reduce((acc, image) => {
		if (!acc.some((accImage) => accImage.id === image.id)) {
			acc.push(image);
		}
		return acc;
	}, []);

	return uniqueImages;
}

export { shuffle, getImageUrls };
