<script>
	function refreshPage() {
		location.reload();
	}
</script>

<div>
	<div
		class="text-center absolute top-1/2
        left-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-4xl font-bold animate-fade-in mb-2"
		id="loadError"
	>
		Could not load map
	</div>
	<p
		class="text-center absolute bottom-64
    left-1/2 transform -translate-x-1/2
    text-2xl font-medium animate-fade-in mb-2 text-gray-500"
	>
		Try
		<button
			on:click|preventDefault={refreshPage}
			class="text-blue-500 hover:text-blue-300"
			id="refresh">refreshing</button
		>
		the page or
		<a href="/faq" class="text-blue-500 hover:text-blue-300" id="refresh"
			>contact support</a
		>
	</p>
</div>
