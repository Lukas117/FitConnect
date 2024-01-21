<script>
	import logo from '$lib/assets/logo.png';
	import Timepicker from 'svelty-picker';
	import EditIcon from './EditIcon.svelte';
	import {
		selectedEvent,
		showHostModal,
		facilities,
		refreshEvents
	} from '../../store.js';
	import SuccessNotif from './Notification.svelte';
	import { navigate } from 'svelte-routing';

	let date = new Date().toISOString().slice(0, 10);
	let eventName = 'Name of Event';
	let selectedFacilityId;
	let showSuccess = false;
	let timeError = false;
	let showFail = false;
	let duration;

	const currentDate = new Date();
	const hours = String(currentDate.getHours()).padStart(2, '0');
	const minutes = String(currentDate.getMinutes()).padStart(2, '0');
	let minTime = `${hours}:${minutes}`;
	let selectedTime;

	let eventNameInput;

	export let userId = 0;

	function focusEventNameInput(event) {
		event.preventDefault();
		eventNameInput.focus();
	}

	// Close the modal
	function closeModal() {
		$showHostModal = false;
		selectedTime = null;
		eventName = 'Name of Event';
		date = new Date().toISOString().slice(0, 10);
	}

	function showSuccessNotification() {
		showSuccess = true;
		$refreshEvents = true;
		setTimeout(() => {
			$refreshEvents = false;
			showSuccess = false;
		}, 2000);
	}

	function showFailNotification() {
		showFail = true;
		$refreshEvents = true;
		setTimeout(() => {
			$refreshEvents = false;
			showFail = false;
		}, 2000);
	}

	function navigateToLivescore() {
		// $showHostModal = false;
		navigate('/livescore');
	}

	async function createEventRequest() {
		if (timeError) {
			showFailNotification();
			return;
		}

		// Parse the selected time and duration into Date objects
		let selectedTimeEnd = new Date(`1970-01-01T${selectedTime}:00+01:00`);
		let durationEnd = new Date(`1970-01-01T${duration}:00+01:00`);

		// Add the durationEnd to the selected time
		selectedTimeEnd.setMinutes(
			selectedTimeEnd.getMinutes() + durationEnd.getMinutes()
		);

		// Format the new time back into a string
		let hours = selectedTimeEnd.getUTCHours().toString().padStart(2, '0');
		let minutes = selectedTimeEnd.getUTCMinutes().toString().padStart(2, '0');
		let newTime = `${hours}:${minutes}`;

		const newEvent = {
			eventName: `${eventName}`,
			startDate: `${date}T${selectedTime}:00+01:00`,
			eventState: 0,
			maximumPlayers: 10,
			hostId: userId,
			playerList: [userId],
			endDate: `${date}T${newTime}:00+01:00`,
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

	$: {
		timeError = selectedTime < minTime;
	}
</script>

{#if showSuccess}
	<div
		class="fixed top-0 inset-x-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<SuccessNotif message="Event Created Successfully!" success={true} />
	</div>
{/if}

{#if showFail}
	<div
		class="fixed top-0 inset-x-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<SuccessNotif
			message="The selected time is
		before the current time."
			success={false}
		/>
	</div>
{/if}

{#if $showHostModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
		id="hostModal"
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

				<!-- <div class="flex flex-col items-center mb-2 md:mb-4">
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
                </div> -->

				<!-- TIME PICKER -->

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div
						class="flex items-center
						bg-titles rounded-md p-2 w-4/5 justify-between"
					>
						<div class="flex items-center">
							<p
								class="text-xs text-white
							md:text-sm mr-2 font-medium"
							>
								Time:
							</p>
							<div class="relative ml-3">
								<Timepicker
									mode="time"
									format="hh:i"
									bind:value={selectedTime}
									startDate={date}
									initialDate={currentDate}
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
						md:text-sm mr-2 font-medium"
						>
							Facility:
						</p>
						<div class="relative">
							<select
								bind:value={selectedFacilityId}
								id="facility"
								name="facility"
								class="p-2 border bg-titles
								 rounded text-white text-xs md:text-sm
								 w-36 font-medium"
							>
								{#each $facilities as facility 
									(facility.facility_id)}
									<option 
									class="font-medium" 
									value={facility.facility_id}
										>{facility.facility_name}
									</option>
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
							min={date}
							class="w-full px-3 py-2 mb-2
							md:mb-4 border border-gray-300
							rounded-md text-xs md:text-sm"
							bind:value={date}
						/>
					</div>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div
						class="flex items-center
					bg-titles rounded-md p-2 w-4/5"
					>
						<p
							class="text-xs text-white
						md:text-sm mr-2 font-medium"
						>
							Duration (min):
						</p>
						<div class="relative">
							<div class="flex">
								<select
									bind:value={duration}
									name="duration"
									class="p-2 border bg-titles
								rounded text-white text-xs md:text-sm
								w-18 font-medium"
								>
									<option value="00:05">5 : 00</option>
									<option value="00:10">10 : 00</option>
									<option value="00:15">15 : 00</option>
									<option value="00:20">20 : 00</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{#if timeError}
					<p
						class="flex flex-col
								items-center text-red-500 text-xs font-medium"
					>
						Invalid time. Please select a future time.
					</p>
				{/if}

				<div class="flex justify-between items-center mb-2 md:mb-4">
					<button
						type="button"
						on:click={closeModal}
						class="text-titles hover:text-gray-700
						px-2 md:px-4 py-1 md:py-2 rounded text-xs
						md:text-sm font-medium"
						>Cancel
					</button>
					{#if $selectedEvent.alreadyStarted}
						<button
							class="bg-button text-white px-4
						py-2 rounded hover:bg-primary
						text-xs md:text-sm font-medium"
							type="submit"
							on:click={navigateToLivescore}
							>Live score
						</button>
					{:else}
						<button
							type="submit"
							on:click={createEventRequest}
							class="bg-button text-white px-4
						py-2 rounded hover:bg-primary
						text-xs md:text-sm font-medium"
							>Save
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
{/if}
