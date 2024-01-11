<script>
	import logo from '$lib/assets/logo.png';
	import Timepicker from 'svelty-picker';
	import EditIcon from './EditIcon.svelte';
	import {
		showHostModal,
		facilities,
		refreshEvents
	} from '../../store.js';
	import SucessNotif from './SuccessNotification.svelte';

	let date = new Date().toISOString().slice(0, 10);
	let eventName = 'Name of Event';
	let selectedFacilityId;
	let showSuccess = false;

	let hours = new Date();
	let selectedTime;

	let eventNameInput;

	function focusEventNameInput(event) {
		event.preventDefault();
		eventNameInput.focus();
	}

	// Close the modal
	function closeModal() {
		$showHostModal = false;
	}

	function showSuccessNotification() {
		showSuccess = true;
		$refreshEvents = true;
		setTimeout(() => {
			$refreshEvents = false;
			showSuccess = false;
		}, 2000);
	}

	async function createEventRequest() {
		console.log('Form data:', 
			{ eventName, hours, selectedFacilityId, date });

		console.log(selectedTime);

		const newEvent = {
			eventName: `${eventName}`,
			startDate: `${date}T${selectedTime}:00Z`,
			eventState: 1,
			maximumPlayers: 10,
			hostId: 1,
			playerList: [1],
			facilityId: selectedFacilityId
		};

		try {
			const response = await fetch('http://localhost:3012/events', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newEvent)
			});
			if (response.status === 201) {
				// Update your markerList only if the status is 201
				// markerList.update((existingMarkers) => ]
				//[...existingMarkers, data]);
				closeModal();
				showSuccessNotification();
			} else {
				// Handle other status codes if needed
				console.error('Error creating event. Status:', response.status);
			}
		} catch (error) {
			console.error('Error creating event:', error);
		}
	}
</script>

{#if showSuccess}
	<div
		class="fixed top-0 inset-x-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<SucessNotif />
	</div>
{/if}

{#if $showHostModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<div class="relative p-8 bg-white rounded-md shadow-md">
			<img
				alt="The project logo"
				src={logo}
				class="w-12 h-12 mb-2 md:w-16 md:h-16 md:mb-4"
			/>
			<form class="space-y-4">
				<div class="flex items-center">
					<input
						bind:this={eventNameInput}
						bind:value={eventName}
						name="eventName"
						class="text-lg md:text-2xl font-bold w-3/5"
					/>
					<button
						id="edit"
						class="ml-2 opacity-50"
						on:click={focusEventNameInput}
					>
						<EditIcon />
					</button>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<button
						class="bg-titles
						text-white rounded-full
						px-10 hover:bg-accent
						transition duration-300
						ease-in-out focus:outline-none
						focus:ring focus:border-accent"
					>
						Invite friends
					</button>
				</div>

				<!-- TIME PICKER -->

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div
						class="flex items-center
						bg-titles rounded-md p-2 w-4/5 justify-between"
					>
						<div class="flex items-center">
							<p
								class="text-xs text-white
							md:text-sm mr-2"
							>
								Time:
							</p>
							<div class="relative ml-5">
								<Timepicker
									mode="time"
									format="hh:i"
									bind:value={selectedTime}
									initialDate={hours}
									inputClasses="
									appearance-none bg-transparent 
									border-none w-16 
									text-2xl font-bold text-white 
									leading-tight focus:outline-none"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div
						class="flex items-center
					bg-titles rounded-md p-2 w-4/5"
					>
						<p
							class="text-xs text-white
						md:text-sm mr-2"
						>
							Facility:
						</p>
						<div class="relative">
							<select
								bind:value={selectedFacilityId}
								id="facility"
								name="facility"
								class="p-2 border bg-titles
								 rounded text-white text-xs md:text-sm w-32"
							>
								{#each $facilities as facility 
									(facility.facility_id)}
									<option value={facility.facility_id}
										>facility: {facility.facility_id}
										</option
									>
								{/each}
							</select>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div class="relative w-4/5">
						<input
							type="date"
							required
							class="w-full px-3 py-2 mb-2 
							md:mb-4 border border-gray-300 
							rounded-md text-xs md:text-sm"
							bind:value={date}
						/>
					</div>
				</div>

				<div class="flex justify-between items-center mb-2 md:mb-4">
					<button
						type="button"
						on:click={closeModal}
						class="text-titles hover:text-gray-700 
						px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm"
						>Cancel
					</button>
					<button
						type="submit"
						on:click={createEventRequest}
						class="bg-button text-white px-4 
						py-2 rounded hover:bg-primary text-xs md:text-sm"
						>Save
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
