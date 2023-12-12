<script>
	import logo from '$lib/assets/logo.png';
	import Timepicker from 'svelty-picker';
	import EditIcon from './EditIcon.svelte';
	import { showHostModal } from '../../store.js';

	let newEvent;
	let todayDate = new Date().toISOString().slice(0, 10);

	let todayHours = new Date();
	let todayString = todayHours.toISOString().slice(0, 10);

	let eventNameInput;

	function focusEventNameInput() {
		eventNameInput.focus();
	}
	// Close the modal
	function closeModal() {
		$showHostModal = false;
	}
</script>

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
						value="Name of Event"
						class="text-lg md:text-2xl font-bold w-3/5"
					/>
					<button id="edit" class="ml-2 opacity-50" on:click={focusEventNameInput}>
						<EditIcon />
					</button>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<button
						class="bg-titles text-white rounded-full px-10 hover:bg-accent transition duration-300 ease-in-out focus:outline-none focus:ring focus:border-accent"
					>
						Invite friends
					</button>
				</div>

				<!-- TIME PICKER -->

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div
						class="flex items-center bg-titles rounded-md p-2 w-4/5 justify-between"
					>
						<div class="flex items-center">
							<p class="text-xs text-white md:text-sm mr-2">Time:</p>
							<div class="relative ml-5">
								<Timepicker
									mode="time"
									format="hh:i"
									value={todayString}
									initialDate={todayHours}
									inputClasses="appearance-none bg-transparent border-none w-16 text-2xl font-bold text-white leading-tight focus:outline-none"
								/>
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div class="flex items-center bg-titles rounded-md p-2 w-4/5">
						<p class="text-xs text-white md:text-sm mr-2">Facility:</p>
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

				<div class="flex flex-col items-center mb-2 md:mb-4">
					<div class="relative w-4/5">
						<input
							type="date"
							id="birthday"
							required
							class="w-full px-3 py-2 mb-2 md:mb-4 border border-gray-300 rounded-md text-xs md:text-sm"
							value={todayDate}
						/>
					</div>
				</div>

				<div class="flex justify-between items-center mb-2 md:mb-4">
					<button
						type="button"
						on:click={closeModal}
						class="text-titles hover:text-gray-700 px-2 md:px-4 py-1 md:py-2 rounded text-xs md:text-sm"
						>Cancel</button
					>
					<button
						type="submit"
						class="bg-button text-white px-4 py-2 rounded hover:bg-primary text-xs md:text-sm"
						>Save</button
					>
				</div>
			</form>
		</div>
	</div>
{/if}
