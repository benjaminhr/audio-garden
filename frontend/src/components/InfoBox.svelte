<script>
	import { goto } from '$app/navigation';
	import { imageStore } from '../stores/images.js';

	export let showNextPageButton = false;

	async function sendImageDescriptions() {
		console.log($imageStore);
		console.log();
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
			const responseData = await response.text();
			console.log(responseData);
		} else {
			console.error('Error in API request:', response.statusText);
		}
	}

	const onDoneClick = async () => {
		await sendImageDescriptions();
		// goto('/analyse');
	};
</script>

<div class="infoBox">
	<p>Select 5 images you would like in your audio garden</p>
	<button class="nextPageButton" disabled={!showNextPageButton} on:click={onDoneClick}>Done</button>
</div>

<style>
	.infoBox {
		background-color: white;
		height: 100%;
		width: 100%;

		border-radius: 10px;
		font-family: Arial, Helvetica, sans-serif;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;

		border: 0.5px rgb(203, 203, 203) solid;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	.infoBox p {
		font-family: Arial, Helvetica, sans-serif;
		font-weight: bold;
	}

	.nextPageButton:disabled {
		background-color: #f0f0f0;
		color: #666;
		border: 1px solid #999;
		cursor: not-allowed;
		opacity: 0.5;
	}

	.nextPageButton {
		height: 30px;
		width: 100px;
		border-radius: 5px;
		background: #f0f0f0;
		border: 1px solid #d6d6d6;
		font-family: Arial, Helvetica, sans-serif;
		opacity: 1;
	}

	.nextPageButton:not(:disabled):hover {
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		cursor: pointer;
	}
</style>
