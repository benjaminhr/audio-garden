<script>
	export let visible = false;
</script>

{#if visible}
	<div class="overlay">
		<img src="checked.png" alt="checkmark" />
	</div>
{/if}

<style>
	.overlay {
		background-color: grey;
		opacity: 0.6;
		flex: 1;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.overlay img {
		width: 25px;
		height: 25px;
	}
</style>
