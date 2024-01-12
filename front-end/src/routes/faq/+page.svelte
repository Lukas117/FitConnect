
<style>
        /* Add a class to hide the answer by default */
    .answer {
        display: none;
    }
</style>


<body class="bg-gray-100">
    <div class="container mx-auto mt-8">
        <h1 class="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        <div class="space-y-4">
            <!-- FAQ Item 1 -->
            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer1')">
                    <span class="text-lg font-medium">How can I get started?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer1" class="mt-2 text-gray-600 answer">First you have to register in the app. You will see the landing page, go to the map, here you will see all the activities that are happening, fill free to join a match, get some exercise in and meet some friends. Later you can create your own match and invite your own team</div>
            </div>

            <!-- FAQ Item 2 (Add more items as needed) -->
            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer2')">
                    <span class="text-lg font-medium">How do I create a match?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer2" class="mt-2 text-gray-600 answer">On the map, theres a rounded black button with a + sign. After clicking it you have to pick a time, a place and a date, you can also invite your friends, althought its not necessary to create a match. After you click save, the match will appear in the map on the choosen location.
                </div>
            </div>

            <!-- Add more FAQ items as needed -->
            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer3')">
                    <span class="text-lg font-medium">How can I track my match results on the app?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer3" class="mt-2 text-gray-600 answer">FILL THIS LATER
                </div>
            </div>
            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer4')">
                    <span class="text-lg font-medium">Where do I get the sensors?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer4" class="mt-2 text-gray-600 answer">The sensors will be available on the facility that the match will be held. You just need to worry about connecting the sensors to your device.
                </div>
            </div>

            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer5')">
                    <span class="text-lg font-medium">How do I connect the sensor to the app?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer5" class="mt-2 text-gray-600 answer">When you create a match you will see a settings button, click and you will see the instuctions on how to connect the sensors.
                </div>
            </div>

            <div class="bg-white p-4 shadow-md rounded-md">
                <button
                    class="flex items-center justify-between w-full focus:outline-none hover:text-blue-600 transition-colors"
                    onclick="toggleAnswer('answer6')">
                    <span class="text-lg font-medium">How do I report a player?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="answer6" class="mt-2 text-gray-600 answer"> FILL IN LATER
                </div>
            </div>
        </div>
    </div>

    <div class="container mx-auto mt-8">
        <h1 class="text-3xl font-bold mb-8">Contact</h1>
            <div class="bg-white p-4 shadow-md rounded-md">
                <h2>FITCONNECT</h2>
                <h2>-</h2>
                <h2>Email: fitconnect123@outlook.com</h2>
                <h2>Phone: +31 932455432</h2>
                <h2>Adress: Het Groene Woud 1, 4331 NB Middelburg</h2>
            </div>
    </div>

    <script>
        // JavaScript function to toggle the visibility of the answer
        function toggleAnswer(answerId) {
            var answer = document.getElementById(answerId);
            if (answer.style.display === "none") {
                answer.style.display = "block";
            } else {
                answer.style.display = "none";
            }
        }
    </script>
</body>



