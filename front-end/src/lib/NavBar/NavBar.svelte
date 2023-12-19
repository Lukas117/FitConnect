<script>
	import HomeIcon from './HomeIcon.svelte';
	import MapIcon from './MapIcon.svelte';
	import StatsIcon from './StatsIcon.svelte';

	let activeTab = 'map';

	function setActiveTab(tab) {
		activeTab = tab;
	}
</script>

<nav
	class="fixed bottom-0 left-0 w-full bg-white flex items-center"
	style="height: 7%;"
>
	<ul class="row-start-2 row-end-3 grid grid-cols-3 list-none p-0 m-0 w-full">
		<a href="/overview" on:click={() => setActiveTab('home')}>
			<li
				class="cursor-pointer flex items-center justify-center border-r-2 border-gray-300"
                    
			>
				<HomeIcon />
			</li>
		</a>
		<a href="/map" on:click={() => setActiveTab('map')}>
			<li class="cursor-pointer flex items-center justify-center border-r-2 border-gray-300 h-full"
			>
				<div class="w-10 h-10 flex items-center">
					<MapIcon />
				</div>
			</li>
		</a>
		<a href="/stats" on:click={() => setActiveTab('stats')}>
			<li
				class="cursor-pointer flex items-center justify-center"
			>
				<StatsIcon />
			</li>
		</a>
	</ul>
</nav>

<style>

</style>
