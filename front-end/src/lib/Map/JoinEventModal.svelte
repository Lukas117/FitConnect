<script>
	import logo from '$lib/assets/logo.png';
	import { refreshEvents, showJoinModal, moreInformation } from '../../store';
	import SuccessNotif from './SuccessJoinNotification.svelte';

	let showSuccess = false;

	// export let markerData = {};

	function closeModal() {
		$showJoinModal = false;
		$moreInformation = false;
	}

	let players = ['John', 'Lukani', 'Megan', 'saulius'];

	function showSuccessNotification() {
		showSuccess = true;
		$refreshEvents = true;
		setTimeout(() => {
			$refreshEvents = false;
			showSuccess = false;
		}, 2000);
	}

	async function joinEventRequest() {
		const currentEventDataResponse = await fetch(
			`http://localhost:3012/events/64`
		);
		const currentEventData = await currentEventDataResponse.json();

		const newPlayerList = [...currentEventData.player_list, 4];

		const updatedEvent = {
			playerList: newPlayerList
		};

		try {
			const response = await fetch('http://localhost:3012/events/64', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updatedEvent)
			});
			if (response.status === 201) {
				closeModal();
				showSuccessNotification();
			} else {
				// Handle other status codes if needed
				console.error('Error joining an event. Status:', 
					response.status);
			}
		} catch (error) {
			console.error('Error joining an event:', error);
		}
	}
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
		<div class="bg-background relative 
    p-8 rounded-md shadow-md w-5/6 mb-12">
			<img alt="The project logo" src={logo} class="w-16 h-16 mb-4" />
			<h1 class="text-2xl font-bold mb-4">Join Event</h1>
			<form class="space-y-4">
				<h1 class="text-primary text-l font-bold mb-4">Players</h1>
				<div class="bg-box" style="overflow-y: auto; height: 200px;">
					<ul class="bg-box">
						{#each players as player, index (player)}
							<li class="flex flex-col mb-4">
								<div class="p-2 border bg-titles rounded">
									<option value="friend1" class="text-white"
										>{index + 1}. {player}
									</option>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div class="flex">
					<h2 class="text-2xl font-bold mb-4 mt-2">Location:</h2>
					<h2
						class="text-2xl font-bold mb-4 bg-gray-300 
            rounded-lg p-2 mb-6 ml-2"
					>
						FACILITY1
					</h2>
				</div>
				<div class="flex">
					<h2 class="text-2xl font-bold mb-4 mt-2">Start:</h2>
					<h2
						class="text-2xl font-bold mb-4 bg-gray-300 
            rounded-lg p-2 mb-6 ml-2"
					>
						12:00
					</h2>
				</div>
				<div class="flex justify-between items-center mb-4">
					<!-- Cancel button on the left -->
					<button
						type="button"
						class="text-primary hover:text-gray-700 
            px-4 py-2 rounded focus:outline-none"
						on:click={closeModal}
					>
						Cancel
					</button>
					<!-- Save button in the middle -->
					{#if !$moreInformation}
						<button
							type="submit"
							on:click={joinEventRequest}
							class="bg-button text-text px-4 py-2 
              rounded hover:bg-blue-600 focus:outline-none"
						>
							Join
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}
