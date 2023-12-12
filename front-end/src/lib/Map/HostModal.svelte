<script>
	import logo from '$lib/assets/logo.png';
	import Timepicker from "svelty-picker";

	let showModal = false;
	let newEvent;
	let today = new Date();
	let todayString = today.toISOString().slice(0, 10);
	// Close the modal
	function closeModal() {
		// Close the modal and reset input values
		showModal = false;
		newEvent = {
			lat: '',
			lng: '',
			title: '',
			content: ''
		};
	}

	function saveEvent() {
		const { lat, lng, title, content } = newEvent;

		const createdEvent = {
			id: 1 + 1,
			lat: parseFloat(lat),
			lng: parseFloat(lng),
			title,
			content
		};
	}

	function displayModal() {
		showModal = true;
		console.log('xujne');
	}
</script>

<div class="flex justify-center h-full w-full">
	<button
		on:click={displayModal}
		class="text-2xl px-8 py-4 bg-blue-500 text-white rounded-lg"
		>Display Modal</button
	>
</div>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="z-index: 1000;"
	>
		<!-- Increase the size of the modal container -->
		<div class="z-40 relative p-4 md:p-8 bg-white rounded-md">
			<img
				alt="The project logo"
				src={logo}
				class="w-12 h-12 mb-2 md:w-16 md:h-16 md:mb-4"
			/>
			<input
				value="Name of Event"
				class="text-lg md:text-2xl font-bold mb-2 md:mb-4 ps-3"
			/>
			<form on:submit|preventDefault={saveEvent} class="space-y-2 md:space-y-4">
				<h1 class="text-titles text-sm md:text-base ps-3">Invite our friends:</h1>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<button
						class="bg-titles text-white rounded-full px-10 hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent"
					>
						Add friends
					</button>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4" style="width: 100%;">
					<div class="flex items-center bg-titles rounded-full p-2">
						<p class="text-xs text-white md:text-sm mr-2">Pick the time:</p>
						<div class="relative">
							<Timepicker 
							mode="time"
							format="hh:i"
							value={todayString}
							initialDate={today}
							inputClasses="appearance-none bg-transparent border-none w-16 text-2xl font-bold text-white leading-tight focus:outline-none"/>
						</div>
					</div>

					<div class="flex flex-col items-center mb-2 md:mb-4" style="width: 100%;">
						<div class="flex items-center bg-titles rounded-full p-2">
							<p class="text-xs text-white md:text-sm mr-2">Pick the facility:</p>
							<div class="relative">
								<select
									id="facility"
									name="facility"
									class="p-2 border bg-titles rounded text-white text-xs md:text-sm"
								>
									<option value="FACILITY1">FACILITY1</option>
									<option value="FACILITY2">FACILITY2</option>
									<option value="FACILITY3">FACILITY3</option>
									<option value="FACILITY4">FACILITY4</option>
								</select>
							</div>
						</div>
					</div>

					<div class="flex flex-col items-center mb-2 md:mb-4" style="width: 100%;">
						<div class="relative">
							<input
								type="date"
								id="birthday"
								required
								class="w-full px-3 py-2 mb-2 md:mb-4 border border-gray-300 rounded-md text-xs md:text-sm"
								value={today}
							/>
						</div>
					</div>

					<div class="flex justify-between items-center mb-2 md:mb-4">
						<!-- Cancel button on the left -->
						<button
							type="button"
							on:click={closeModal}
							class="text-titles hover:text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm"
							>Cancel</button
						>

						<!-- Save button in the middle -->
						<button
							type="submit"
							class="bg-button text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-blue-600 text-xs md:text-sm"
							>Save</button
						>

						<!-- Icon for definitions on the right -->
						<div class="flex items-center">
							<!-- Replace "YourIconComponent" with your actual icon component or SVG -->
							<button
								type="button"
								on:click={closeModal}
								class="text-gray-500 hover:text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm"
								>Definitions</button
							>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
{/if}

<style>
	/* Add styles for the overlay */
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Add styles for the modal */
	.modal {
		background-color: white;
		padding: 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		border-radius: 10px; /* Adjust as needed */
	}

	.dropdown {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		max-height: 200px;
		overflow-y: auto;
		border: 1px solid #ccc;
		background-color: #fff;
		z-index: 1;
	}

	.dropdown-content a {
		padding: 10px;
		text-decoration: none;
		display: block;
		color: #333;
	}

	.dropdown-content a:hover {
		background-color: #f1f1f1;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}
</style>
