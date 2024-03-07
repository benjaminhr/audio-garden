<script>
	import { onMount } from 'svelte';
	import { getImageUrls, shuffle } from '../util/imageUtils.js';
	import InfoBox from './InfoBox.svelte';
	import SelectedOverlay from './SelectedOverlay.svelte';
	import { imageStore } from '../stores/images.js';

	let images = [];
	let infoBoxInjected = false;
	let showNextPageButton = false;

	onMount(async () => {
		images = shuffle(await getImageUrls());
		images = images.map((image) => ({ ...image, selected: false }));

		const nthChild = Math.round(images.length / 3);
		images.splice(nthChild, 0, { isInfoBox: true });
		infoBoxInjected = true;
	});

	function handleImageLoad(event) {
		event.target.style.opacity = 0.7;
	}

	function selectImage(image) {
		if ($imageStore.length === 5) {
			return;
		}
		image.selected = !image.selected;
		images = images.map((img) =>
			img.id === image.id ? { ...img, selected: image.selected } : img
		);

		imageStore.update((imagesInStore) => [...imagesInStore, image]);

		if ($imageStore.length === 5) {
			showNextPageButton = true;
		}
	}
</script>

<div class="images">
	{#each images as image, index (image.id)}
		{#if image.isInfoBox && infoBoxInjected}
			<div class="image-container">
				<InfoBox {showNextPageButton} />
			</div>
		{:else}
			<div
				class="image-container {image.selected ? 'selected' : 'hover-effect'}"
				on:click={() => selectImage(image)}
				role="none"
			>
				<img
					class="image-item"
					src={image.urls.regular}
					alt={image.description}
					on:load={handleImageLoad}
				/>
				<SelectedOverlay visible={image.selected} />
			</div>
		{/if}
	{/each}
</div>

<!-- Dummy -->
<div class="selected"></div>

<style>
	:global(body) {
		overflow: hidden;
		user-select: none;
	}

	.images {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: center;
		margin: 0;
		padding: 0;
		width: 110vw;
		height: auto;
		overflow: hidden;
		gap: 10px;
		position: absolute;
		left: -38px;
		top: -30px;
	}

	.image-container {
		flex: 1;
		min-width: 12%;
		height: 300px;
		position: relative;
		transition:
			opacity 0.3s ease-in-out,
			min-width 0.3s ease-in-out;
	}

	.hover-effect:hover {
		min-width: 22%;
	}

	.hover-effect:hover .image-item {
		opacity: 1 !important;
	}

	.image-item {
		transition: opacity 0.3s ease-in-out;
		flex: 1;
		border-radius: 5px;
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		object-fit: cover;
		border: 0.5px rgb(203, 203, 203) solid;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}
</style>
