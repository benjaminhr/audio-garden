<script>
	import { onMount } from 'svelte';
	import { imageStore } from '../../stores/images.js';

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
			if (data.size > 0 && data.type.startsWith('audio/')) {
				audioSrc = URL.createObjectURL(data);
			}
		} else {
			console.error('Error in API request:', response.statusText);
		}
	}
</script>

<div class="analyse">
	<main>
		{#if audioSrc}
			<div class="audioWrapper">
				<audio class="audioPlayer" controls src={audioSrc}>
					Your browser does not support the audio element.
				</audio>
			</div>
		{:else}
			<div class="loading">
				<p>Creating your audio garden</p>
				<img src="sparkle.png" alt="" />
			</div>
		{/if}
	</main>
	<div class="half-background"></div>
</div>

<style>
	:global(body) {
		overflow: hidden;
		user-select: none;
		margin: 0;
		padding: 0;
	}

	.analyse {
		width: 100vw;
		height: 100vh;
	}

	.half-background {
		position: absolute;
		bottom: 0;
		height: 50vh;
		width: 100%;
		background-image: url('water.jpg');
		background-size: cover;
		background-position: center;
	}

	.audioWrapper {
		background-color: rgb(239, 239, 239);
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 50px 20px 50px;
	}

	.loading {
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
		font-size: 1.2rem;
		background-color: rgb(239, 239, 239);
		border-radius: 10px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 50px 20px 50px;
	}

	.loading p,
	img {
		display: inline-block;
	}

	.loading img {
		width: 35px;
		height: 35px;
		margin-left: 10px;
	}
</style>
