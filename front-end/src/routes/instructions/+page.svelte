<script>
	import getsensor from '$lib/assets/getsensor.png';
	import findhoop from '$lib/assets/findhoop.png';
	import installsensors from '$lib/assets/installsensors.png';
	import triggersscore from '$lib/assets/triggersscore.png';
</script>

<div>
	<h2 class="text-lg md:text-2xl font-bold mb-2 md:mb-4">
		Sensors Instructions
	</h2>

	<div class="quadrant grid grid-cols-2 gap-2 w-96 h-46vh mx-auto">
		<div class="quadrant1 overflow-hidden rounded-lg">
			<img
				alt="Get Sensor"
				src={getsensor}
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="quadrant2 overflow-hidden rounded-lg">
			<img alt="Find Hoop" src={findhoop} class="w-full h-full object-cover" />
		</div>
		<div class="quadrant3 overflow-hidden rounded-lg">
			<img
				alt="Install Sensors"
				src={installsensors}
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="quadrant4 overflow-hidden rounded-lg">
			<img
				alt="Triggers Score"
				src={triggersscore}
				class="w-full h-full object-cover"
			/>
		</div>
	</div>
</div>

<div class="button-container flex justify-center mt-8">
	<button
		class="ok-button bg-button
		text-background px-4 py-2
		rounded-md cursor-pointer transition duration-300 hover:bg-secondary">OK</button
	>
</div>
