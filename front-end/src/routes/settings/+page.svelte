<script>
	import logo from '$lib/assets/logo.png';

	let showClockPicker = false;
	let selectedTime = '00:00';

	const hours = Array.from({ length: 24 }, (_, index) =>
		index.toString().padStart(2, '0')
	);
	const minutes = Array.from({ length: 60 }, (_, index) =>
		index.toString().padStart(2, '0')
	);

	function openClockPicker() {
		showClockPicker = true;
	}

	function closeClockPicker() {
		showClockPicker = false;
	}

	function selectHour(hour) {
		selectedTime = `${hour}:${selectedTime.split(':')[1]}`;
		closeClockPicker();
	}

	function selectMinute(minute) {
		selectedTime = `${selectedTime.split(':')[0]}:${minute}`;
		closeClockPicker();
	}
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center"
	style="z-index: 1000"
>
	<!-- Increase the size of the modal container -->
	<div class="z-40 relative p-8 bg-background rounded-md shadow-md">
		<img alt="The project logo" src={logo} class="w-16 h-16 mb-4" />
		<h2 class="text-2xl font-bold mb-4">Event Settings</h2>
		<form class="space-y-4">
			<div class="bg-box">
				<h1 class="text-text bg-titles mb-2">Match</h1>

				<div class="flex items-center bg-titles rounded-md mb-4">
					<p class="text-white mb-2 mr-4">Duration:</p>
					<button
						on:click={() => openClockPicker()}
						class="bg-white text-text
						px-5 py-0.33 rounded-md
						hover:bg-accent focus:outline-none"
					>
						{selectedTime}
					</button>
					{#if showClockPicker}
						<div class="dropdown-content">
							<div class="flex justify-between">
								<!-- Hours dropdown -->
								<div class="flex flex-col">
									{#each hours as hour (hour)}
										<button
											on:click={() => selectHour(hour)}
											class="text-xs md:text-sm"
										>
											{hour}
										</button>
									{/each}
								</div>
								<!-- Minutes dropdown -->
								<div class="flex flex-col">
									{#each minutes as minute (minute)}
										<button
											on:click={() => selectMinute(minute)}
											class="text-xs md:text-sm"
										>
											{minute}
										</button>
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>

				<h1 class="text-text bg-titles mb-2">Devices</h1>
				<div class="flex flex-col mb-4">
					<h5
						class="text-white
					bg-titles rounded-md"
					>
						Score sensors
					</h5>
					<div class="flex items-center">
						<p
							class="text-white
						bg-titles rounded-md"
							style="width: 200px;"
						>
							#1 Hoop Sensor not Setup
						</p>
						<button
							class="bg-button
							 text-text px-2 py-1
							 rounded ml-4 focus:outline-none"
						>
							Add</button
						>
					</div>
					<div class="flex items-center">
						<p
							class="text-white
						bg-titles rounded-md"
							style="width: 200px;"
						>
							#2 Hoop Sensor not Setup
						</p>
						<button
							class="bg-button
							text-text px-2 py-1
							rounded ml-4 focus:outline-none"
						>
							Add</button
						>
					</div>
				</div>
			</div>

			<div class="flex justify-between items-center mb-4">
				<!-- Cancel button on the left -->
				<button
					type="button"
					class="text-primary
					hover:text-gray-700 px-4 py-2
					rounded focus:outline-none"
				>
					Cancel
				</button>
				<!-- Save button in the middle -->
				<button
					type="submit"
					class="text-text px-4 py-2
					rounded bg-button focus:outline-none"
				>
					Save
				</button>
			</div>
		</form>
	</div>
</div>
