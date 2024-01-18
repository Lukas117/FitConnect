<script>
	import TitleComponent from '$lib/Title/TitleComponent.svelte';

	function toggleAnswer(answerId) {
		const answer = document.getElementById(answerId);
		if (answer.style.display === 'none') {
			answer.style.display = 'block';
		} else {
			answer.style.display = 'none';
		}
	}
</script>

<title>FAQ</title>

<TitleComponent title="FAQ" enableSideBar={false} />

<body class="flex flex-col min-h-screen">
	<div class="px-5 mt-24">
		<div class="space-y-5">
			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer1')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						How can I get started?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer1" class="mt-2" style="display: none">
					First you have to register in the app. You will see the landing page,
					go to the map, here you will see all the activities that are
					happening, fill free to join a match, get some exercise in and meet
					some friends. Later you can create your own match and invite your own
					team
				</div>
			</div>

			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer2')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						How do I create a match?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer2" class="mt-2" style="display: none">
					On the map, there's a button with text host match. After clicking it
					you have to pick a time, a place and a date, you can also invite your
					friends, althought its not necessary to create a match. After you
					click save, the match will appear in the map on the choosen location.
				</div>
			</div>

			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer3')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						How can I track my match results on the app?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer3" class="mt-2" style="display: none">
					Answer will be provided shortly!
				</div>
			</div>

			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer4')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						Where do I get the sensors?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer4" class="mt-2" style="display: none">
					The sensors will be available on the facility that the match will be
					held. You just need to worry about connecting the sensors to your
					device.
				</div>
			</div>

			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer5')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						How do I connect the sensor to the app?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer5" class="mt-2" style="display: none">
					When you create a match you will see a settings button, click and you
					will see the instuctions on how to connect the sensors.
				</div>
			</div>

			<div class="bg-slate-100 p-4 shadow-md rounded-md">
				<button
					on:click={() => toggleAnswer('answer6')}
					class="flex items-center justify-between w-full"
				>
					<span class="text-lg font-medium text-left">
						How do I report a player?
					</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
				<div id="answer6" class="mt-2" style="display: none">
					Answer will be provided shortly!
				</div>
			</div>
		</div>
	</div>

	<div class="p-5 mt-5">
		<h1 class="text-3xl font-bold mb-5">Contact</h1>
		<div class="bg-slate-100 p-4 shadow-md rounded-md">
			<h2 class="text-xl mb-3">FitConnect</h2>
			<h2><b>Email:</b> fitconnect123@outlook.com</h2>
			<h2><b>Phone:</b> +31 932455432</h2>
			<h2><b>Address:</b> Het Groene Woud 1, 4331 NB Middelburg</h2>
		</div>
	</div>
</body>
