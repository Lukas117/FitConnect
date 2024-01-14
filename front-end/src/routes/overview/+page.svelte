<script>
	import { onMount } from 'svelte';
	import NavBar from '$lib/NavBar/NavBar.svelte';
	import TitleComponent from '$lib/Title/TitleComponent.svelte';
	import HostModal from '$lib/Map/HostModal.svelte';
	import JoinEventModal from '$lib/Map/JoinEventModal.svelte';
	import {
		// facilities,
		moreInformation,
		showHostModal,
		showJoinModal,
		selectedEvent
	} from '../../store.js';
	import { goto } from '$app/navigation';

	let showOtherEvents = true;
	let showMyEvents = false;

	let joinedEvent = [];
	let hostedEvent = [];
	let eventList = [];
	// let intervalId;

	onMount(async () => {
		await getEvents();
		await CheckEventsStart();

		intervalId = setInterval(CheckEventsStart, 60000);
	});

	const toggleOtherEvents = () => {
		showOtherEvents = true;
		showMyEvents = false;
	};

	const toggleMyEvents = () => {
		showMyEvents = true;
		showOtherEvents = false;
	};

	async function getEvents() {
		const myId = 4; // TODO: change to current user
		// const myId = localStorage.getItem("user_id"); // TODO: change to current user

		try {
			const response = await fetch('http://localhost:3012/events', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			let eventData = await response.json();

			eventList = eventData.filter(
				(item) =>
					!item.player_list.includes(myId) &&
					item.host_id !== myId &&
					new Date(item.start_date) >= new Date()
			);

			joinedEvent = eventData.filter(
				(item) =>
					item.player_list.includes(myId) &&
					new Date(item.end_date) >= new Date()
			);

			hostedEvent = eventData.filter(
				(item) => item.host_id === myId && new Date(item.end_date) >= new Date()
			);
		} catch (error) {
			console.error('Error fetching events:', error);
		}
	}

	async function CheckEventsStart() {
		joinedEvent = joinedEvent.map((item) => ({
			...item,
			alreadyStarted:
				new Date(item.start_date) < new Date() &&
				new Date(item.end_date) >= new Date()
		}));
		hostedEvent = hostedEvent.map((item) => ({
			...item,
			alreadyStarted:
				new Date(item.start_date) < new Date() &&
				new Date(item.end_date) >= new Date()
		}));
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
		return new Intl.DateTimeFormat('en-US', options).format(date);
	}

	function displayHostModal(event) {
		if (event.alreadyStarted) {
			$selectedEvent = event;
			goto('/livescore');
		} else {
			$showHostModal = true;
			$moreInformation = true;
		}
	}

	function displayJoinModal() {
		$showJoinModal = true;
		$moreInformation = false;
	}

	function displayJoinInfoModal(event) {
		if (event.alreadyStarted) {
			goto('/livescore');
		} else {
			$showJoinModal = true;
			$moreInformation = true;
		}
	}

	// let alreadyStarted = false;
</script>

<title>Events</title>

<body>
	<TitleComponent title="EVENTS" />

	<div class="flex fixed mt-20 top-0 left-0 right-0 z-10">
		<button
			class="{showOtherEvents
				? 'bg-red-500'
				: 'bg-orange-500'} text-white text-xl px-10 py-3 w-1/2 focus:outline-none"
			on:click={toggleOtherEvents}
		>
			Other Events
		</button>
		<button
			class="{showMyEvents
				? 'bg-red-500'
				: 'bg-orange-500'} text-white text-xl px-10 py-3 w-1/2 focus:outline-none"
			on:click={toggleMyEvents}
		>
			My Events
		</button>
	</div>

	<div class="m-5 pt-32 text-2xl pb-20">
		{#if showOtherEvents}
			{#if eventList.length === 0}
				<h1 class="text-center font-bold mt-4">No events available</h1>
			{:else}
				{#each eventList as event (event.event_id)}
					<div class="bg-orange-300 text-white p-3 rounded mt-4">
						<button class="w-full" on:click={displayJoinModal}>
							<div class="bg-red-700 rounded-md py-1">
								<div class="pl-2 text-left">
									{event.event_name}
								</div>
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Date: {formatDate(event.start_date)}
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Players:
								<b>{event.player_list.length}/{event.maximum_players}</b>
							</div>
						</button>
					</div>
				{/each}
			{/if}
		{/if}

		{#if showMyEvents}
			<h1 class="font-bold mt-4">Hosted events:</h1>
			{#if hostedEvent.length === 0}
				<h1 class="text-center mt-4">No hosted events available</h1>
			{:else}
				{#each hostedEvent as event (event.event_id)}
					<div class="bg-orange-300 text-white p-3 rounded mt-4">
						<button class="w-full" on:click={() => displayHostModal(event)}>
							<div class="bg-red-700 rounded-md py-1">
								<div class="pl-2 text-left">
									{event.event_name}
								</div>
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Date: {formatDate(event.start_date)}
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Players:
								<b>{event.player_list.length}/{event.maximum_players}</b>
							</div>
						</button>
					</div>
				{/each}
			{/if}

			<div class="border-t-8 border-gray-300 my-6" />

			<h1 class="font-bold mt-4">Joined events:</h1>
			{#if joinedEvent.length === 0}
				<h1 class="text-center mt-4">No joined events available</h1>
			{:else}
				{#each joinedEvent as event (event.event_id)}
					<div class="bg-orange-300 text-white p-3 rounded mt-4">
						<button class="w-full" on:click={() => displayJoinInfoModal(event)}>
							<div class="bg-red-700 rounded-md py-1">
								<div class="pl-2 text-left">
									{event.event_name}
								</div>
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Date: {formatDate(event.start_date)}
							</div>
							<div class="mt-1 pl-1 pr-1 text-left text-xl text-black">
								Players:
								<b>{event.player_list.length}/{event.maximum_players}</b>
							</div>
						</button>
					</div>
				{/each}
			{/if}
		{/if}
	</div>

	<NavBar />

	<JoinEventModal />
	<HostModal />
</body>
