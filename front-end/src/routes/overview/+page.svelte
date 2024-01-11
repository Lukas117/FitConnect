<script>
	import { onMount } from 'svelte';

	let showOtherEvents = false;
	let showMyEvents = false;

	let filteredData;

	onMount(async () => {
		await getEvents();
	});

	const toggleOtherEvents = () => {
		showOtherEvents = !showOtherEvents;
		showMyEvents = false; // Hide My Events
	};

	const toggleMyEvents = () => {
		showMyEvents = !showMyEvents;
		showOtherEvents = false; // Hide Other Events
	};

	async function getEvents() {
		const myId = 4;

		try {
			const response = await fetch('http://localhost:3012/events', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			let eventData = await response.json();
			filteredData = eventData.filter(
				(item) => item.player_list && item.player_list.includes(myId)
			);
		} catch (error) {
			console.error('Error fetching events:', error);
		}
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		};
		const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
			date
		);
		return formattedDate;
	}
</script>

<body class="flex flex-col items-center justify-center h-screen">
	<h1 class="text-4xl font-bold mb-4">EVENTS</h1>

	<div class="flex m-4">
		<button
			class="bg-orange-500 text-white text-xl px-10 py-3 rounded"
			on:click={toggleOtherEvents}
		>
			Other Events
		</button>
		<button
			class="bg-red-500 text-white text-xl px-10 py-3 rounded ml-2"
			on:click={toggleMyEvents}
		>
			My Events
		</button>
	</div>

	<div class="card mt-0 text-2xl">
		{#if showOtherEvents}
			<div class="bg-orange-300 text-white p-4 rounded">
				<div class="mt-4 bg-red-700 rounded-md">The best lobby 1</div>
				<div class="mt-3 text-black">Date: 27 of December 19:30</div>
				<div class="mt-3 text-black">Players: 3/8</div>
			</div>
		{/if}

		{#if showOtherEvents}
			<div class="bg-orange-300 text-white p-4 rounded mt-4">
				<div class="mt-4 bg-red-700 rounded-md">The best lobby 2</div>
				<div class="mt-3 text-black">Date: 28 of December 20:00</div>
				<div class="mt-3 text-black">Players: 5/10</div>
			</div>
		{/if}

		{#if showOtherEvents}
			<div class="bg-orange-300 text-white p-4 rounded mt-4">
				<div class="mt-4 bg-red-700 rounded-md">The best lobby 3</div>
				<div class="mt-3 text-black">Date: 29 of December 21:30</div>
				<div class="mt-3 text-black">Players: 7/12</div>
			</div>
		{/if}

		{#if showMyEvents}
			<h1 class="mt-1 font-bold">Hosted events</h1>
			<div class="bg-orange-300 text-white p-4 rounded mt-4">
				<div class="mt-4 bg-red-700 rounded-md">My Event 1</div>
				<div class="mt-3 text-black">Date: 29 of December 8:30</div>
				<div class="mt-3 text-black">Players: 10/100</div>
			</div>

			<div class="bg-orange-300 text-white p-4 rounded mt-4">
				<div class="mt-4 bg-red-700 rounded-md">My event 2</div>
				<div class="mt-3 text-black">Date: 1 of January 8:30</div>
				<div class="mt-3 text-black">Players: 2/10</div>
			</div>

			<h1 class="mt-2 font-bold">Joined events</h1>
			{#each filteredData as event (event.id)}
				<div class="bg-orange-300 text-white p-4 rounded mt-4">
					<div
						class="mt-4
					bg-red-700 rounded-md"
					>
						{event.event_name}
					</div>
					<div class="mt-3 text-black">
						Date: {formatDate(event.start_date)}
					</div>
					<div class="mt-3 text-black">
						Players: {event.player_list.length}/
						{event.maximum_players}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</body>

<style>
	.card {
		max-width: 400px;
		padding: 20px;
		background-color: #fff;
		border: 1px solid #e2e8f0;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
