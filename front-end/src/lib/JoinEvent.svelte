<script>
	import logo from '$lib/assets/logo.png';
	import { showJoinModal } from '../store';

    console.log($showJoinModal);
</script>

{#if $showJoinModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center"
		style="z-index: 1000"
	>
		<!-- Increase the size of the modal container -->
		<div class="z-40 relative p-8 bg-background rounded-md shadow-md">
			<img alt="The project logo" src={logo} class="w-16 h-16 mb-4" />
			<h2 class="text-2xl font-bold mb-4">Join Event</h2>
			<form class="space-y-4">
				<h1 class="text-primary">Players</h1>
				<div class="bg-box">
					<div class="flex flex-col mb-4">
						<div class="p-2 border bg-titles rounded">
							<option value="friend1">Jonnhy D </option>
						</div>
					</div>
					<div class="flex flex-col mb-4">
						<div class="p-2 border bg-titles rounded">
							<option value="friend1">Lukani </option>
						</div>
					</div>
					<div class="flex flex-col mb-4">
						<div class="p-2 border bg-titles rounded">
							<option value="friend1">Tomolo </option>
						</div>
					</div>
					<div class="flex flex-col mb-4">
						<div class="p-2 border bg-titles rounded">
							<option value="friend1">Wonder M </option>
						</div>
					</div>
				</div>
				<div class="flex items-center mb-4">
					<div class="flex flex-col md:w-1/2 mr-4">
						<!-- Adjust width as needed -->
						<div class="relative">
							<select
								id="friend"
								name="PICK THE PLACE"
								class="p-2 border bg-white-400 rounded"
							>
								<option value="FACILITY1">FACILITY1</option>
							</select>
						</div>
					</div>
					<div class="dropdown pl-20">
						<!-- Adjust width as needed -->
						<div class="dropdown pl-20 text-text">12:00</div>
					</div>
				</div>
				<div class="flex justify-between items-center mb-4">
					<!-- Cancel button on the left -->
					<button
						type="button"
						class="text-primary hover:text-gray-700 px-4 py-2 rounded focus:outline-none"
					>
						Cancel
					</button>
					<!-- Save button in the middle -->
					<button
						type="submit"
						class="bg-button text-text px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
					>
						Join
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
