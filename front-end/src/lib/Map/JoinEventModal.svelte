<script>
	import logo from '$lib/assets/logo.png';
	import {
		refreshEvents,
		showJoinModal,
		moreInformation,
		joinEventId,
		facilities
	} from '../../store';
	import playerListToNames from './playerAdapter.js';
	import SuccessNotif from './SuccessJoinNotification.svelte';

	let showSuccess = false;

	function closeModal() {
		$showJoinModal = false;
		$moreInformation = false;
	}

	let user_id = 1;
	let eventData = {};
	let facilityData = {};
	let formatedStartTime = '...';

	let players = [{}];

	// get event after its known which join button was pressed
	showJoinModal.subscribe(async (showModal) => {
		if (showModal) {
			await getEvent();
		}
		if (!showModal) {
			// reset event and facility data to default after modal closes
			eventData = {
				event_name: '...',
				player_list: [],
				facility_id: 0,
				start_date: '2021-05-05T12:00:00.000Z'
			};
			facilityData = {
				facility_name: '...',
				latitude: 51.4951426,
				longitude: 3.6096064
			};
			formatedStartTime = '...';
			players = [
				{
					player_id: 1,
					name: '...'
				},
				{
					player_id: 2,
					name: '...'
				},
				{
					player_id: 3,
					name: '...'
				}
			];
		}
	});

	function showSuccessNotification() {
		showSuccess = true;
		$refreshEvents = true;
		setTimeout(() => {
			$refreshEvents = false;
			showSuccess = false;
		}, 2000);
	}

	async function getEvent() {
		const response = await fetch(
			`http://localhost:3012/events/${$joinEventId}`
		);
		eventData = await response.json();

		facilityData = $facilities.find(
			(facility) => facility.facility_id === eventData.facility_id
		);

		formatedStartTime = formatDate(eventData.start_date);
		playerListToNames(eventData.player_list).then((result) => {
			players = result;
		});

		console.log(players);
	}

	function formatDate(unformattedDate) {
		let date = new Date(unformattedDate);

		return `${date.getDate()}-${
			date.getMonth() + 1
		}-${date.getFullYear()} ${date.getHours()}:${(
			'0' + date.getMinutes()
		).slice(-2)}`;
	}

	// async function joinEventRequest() {
	// 	const currentEventDataResponse = await fetch(
	// 		`http://localhost:3012/events/${$joinEventId}`
	// 	);
	// 	const currentEventData = await currentEventDataResponse.json();

	// 	joinEventId.subscribe((value) => {
	// 		console.log(value);
	// 	});

	// 	const newPlayerList = [...currentEventData.player_list, 4];

	// 	const updatedEvent = {
	// 		playerList: newPlayerList
	// 	};

	// 	try {
	// 		const response = await fetch('http://localhost:3012/events/64', {
	// 			method: 'PATCH',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(updatedEvent)
	// 		});
	// 		if (response.status === 201) {
	// 			closeModal();
	// 			showSuccessNotification();
	// 		} else {
	// 			// Handle other status codes if needed
	// 			console.error('Error joining an event. Status:',
	// 				response.status);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error joining an event:', error);
	// 	}
	// }
</script>

{#if showSuccess}
	<div
		class="fixed top-0 inset-x-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<SuccessNotif />
	</div>
{/if}

{#if $showJoinModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<!-- Increase the size of the modal container -->
		<div
			class="bg-background relative
    p-8 rounded-md shadow-md w-5/6 lg:w-3/6 mb-12"
		>
			<img alt="The project logo" src={logo} class="w-16 h-16 mb-4" />
			<h1
				class="text-2xl
			font-bold mb-4"
			>
				Join "{eventData.event_name}"
			</h1>
			<form class="space-y-4">
				<h1 class="text-primary text-l font-bold mb-4">Players</h1>
				<div class="bg-box" style="overflow-y: auto; height: 200px;">
					<ul class="bg-box">
						{#each players as player, index (player)}
							<li class="flex flex-col mb-4">
								<div class="p-2 border bg-titles rounded">
									<option value="friend1" class="text-white"
										>{index + 1}. {player.name}
									</option>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex justify-between">
					<h2
						class="text-lg
					lg:text-2xl font-bold mt-2"
					>
						Location:
					</h2>
					<h2
						class="text-lg
						lg:text-2xl font-bold bg-gray-300
            rounded-lg p-2 ml-2"
					>
						{facilityData.facility_name}
					</h2>
				</div>

				<div class="flex justify-between">
					<h2
						class="text-lg lg:text-2xl
					font-bold mt-2"
					>
						Start:
					</h2>
					<h2
						class="ml-10 text-lg
						lg:text-2xl font-bold bg-gray-300
						rounded-lg p-2 ml-2"
					>
						{formatedStartTime}
					</h2>
				</div>

				<!-- google link -->
				<div class="flex justify-between">
					<h2
						class="text-lg
					lg:text-2xl
					font-bold mt-2"
					>
						Directions:
					</h2>
					<a
						href="https://www.google.com
						/maps/dir//
						{facilityData.latitude},{facilityData.longitude}/"
						class="text-lg lg:text-2xl
						font-bold mb-4 bg-blue-500
						hover:bg-blue-700 text-white
						rounded-lg p-2 ml-2"
						target="_blank"
						rel="noopener noreferrer"
					>
						Go to Google Maps
					</a>
				</div>

				<div class="flex justify-between items-center mb-4">
					<!-- Cancel button on the left -->
					<button
						type="button"
						class="text-primary hover:text-gray-700
             py-2 rounded focus:outline-none font-medium"
						on:click={closeModal}
					>
						Cancel
					</button>

					{#if !$moreInformation}
						<button
							type="submit"
							class="bg-button text-text px-4 py-2
              rounded hover:bg-blue-600 focus:outline-none font-medium"
						>
							Join
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}
