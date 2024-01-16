<script>
	import { onMount } from 'svelte';
	import TitleComponent from '$lib/Title/TitleComponent.svelte';
	import NavBar from '$lib/NavBar/NavBar.svelte';
	import { selectedEvent } from '../../store.js';
	import {checkAuth} from "$lib/auth.js";
	import {navigate} from "svelte-routing";

	let isPaused = false;
	let userId = 0;

	onMount(() => {
		checkAuth(fetch)
				.then(result => {
					userId = result;
					console.log('Authentication successful:', result);
				})
				.catch(error => {
					console.error('Authentication error:', error);
					navigate('/user/login');
					window.location.reload();
				});

		setInterval(updateCountdown, 1000);
	});

	function calculateDuration(currentDate, endDate) {
		if (!endDate) {
			return {
				minutes: 0,
				seconds: 0
			};
		}

		const endTimestamp = endDate.getTime();

		const difference = endTimestamp - currentDate;

		const seconds = Math.floor(difference / 1000);
		const minutes = Math.floor(seconds / 60);

		return {
			seconds: seconds % 60, // Remainder for seconds
			minutes: minutes
		};
	}

	const selectedEventEndDate = $selectedEvent.end_date
		? new Date($selectedEvent.end_date)
		: null;
	const duration = calculateDuration(Date.now(), selectedEventEndDate);

	const updateCountdown = () => {
		if (!isPaused) {
			if (duration.minutes >= 0) {
				if (duration.minutes !== 0 || duration.seconds !== 0) {
					duration.seconds -= 1;
				}
			}

			if (duration.seconds < 0) {
				duration.minutes -= 1;
				duration.seconds = 59;
			}
		}
	};

	function formatCountdown(value) {
		return value < 10 ? `0${value}` : value;
	}

	let number1 = 0;
	let number2 = 0;

	const handleClick1 = () => {
		number1 += 2;
	};
	const handleClick2 = () => {
		number2 += 2;
	};

	const togglePause = () => {
		isPaused = !isPaused;
	};

</script>

<title>Livescore</title>

<body>
	<TitleComponent title="LIVESCORE" />

	<div>
		<div
			class="pt-24 text-xl
		text-center justify-center"
		>
			Time remaining
		</div>
		<div class="flex flex-row text-center justify-center">
			<div class="flex flex-col p-2 items-center">
				<span class="font-bold text-5xl"
					>{formatCountdown(duration.minutes)}</span
				>MIN
			</div>
			<div class="flex flex-col p-2 items-center">
				<span class="font-bold text-5xl"
					>{formatCountdown(duration.seconds)}</span
				>SEC
			</div>
		</div>
	</div>

	<div class="flex pt-14 pb-24">
		<div
			class="flex flex-col text-2xl
		font-bold items-center w-1/2 relative"
		>
			TEAM 1
			<button on:click={handleClick1}>
				<div
					class="w-36 h-36 bg-primary
				 rounded-full flex mt-10 text-white"
				>
					<span class="text-7xl pt-0 m-auto">{number1}</span>
				</div>
			</button>
		</div>

		<div
			class="absolute left-1/2 top-1/2
			transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-[50vh] bg-black"
			style="top: calc(50% + 23px);"
		/>

		<div
			class="flex flex-col text-2xl font-bold
		items-center w-1/2 relative"
		>
			TEAM 2
			<button on:click={handleClick2}>
				<div
					class="w-36 h-36 bg-red-700
				rounded-full flex mt-10 text-white"
				>
					<span class="text-7xl pt-0 m-auto">{number2}</span>
				</div>
			</button>
		</div>
	</div>

	{#if $selectedEvent.host_id === userId}
		<div class="flex flex-col items-center mt-44">
			<button
				on:click={togglePause}
				class={`text-black transition-transform
						duration-300 ease-in-out ${isPaused ? 'transform -rotate-180' : ''}`}
			>
				<svg
					class="w-16 h-16 text-primary fill-primary rotate-180"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={isPaused ? 'M5 3l14 9L5 21V3z' : 'M6 4h4v16H6zM14 4h4v16h-4z'}
					/>
				</svg>
			</button>
		</div>
	{/if}

	<NavBar />
</body>
