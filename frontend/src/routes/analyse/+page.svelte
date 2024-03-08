<script>
	import { onMount } from 'svelte';
	import { imageStore } from '../stores/images.js';

	let audioSrc = null;

	onMount(async () => {
		await sendImageDescriptions();
	});

	async function sendImageDescriptions() {
		const imageDescriptions = $imageStore.map((imageObj) => {
			if (imageObj.description) {
				return imageObj.description;
			} else {
				return imageObj.slug;
			}
		});

		const requestBody = { descriptions: imageDescriptions };

		const response = await fetch('http://localhost:8080/analyse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (response.ok) {
			const data = await response.blob();
			audioSrc = URL.createObjectURL(data);
		} else {
			console.error('Error in API request:', response.statusText);
		}
	}

	onDestroy(() => {
		URL.revokeObjectURL(audioSrc);
	});
</script>

<p>analysing</p>
<main>
	{#if audioSrc}
		<audio controls src={audioSrc}> Your browser does not support the audio element. </audio>
	{/if}
</main>
