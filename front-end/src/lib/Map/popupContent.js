import { showJoinModal, joinEventId  } from '../../store.js';

export default function getPopupContent(markerData) {
	const div = document.createElement('div');
	div.innerHTML = `
<h3 class="text-lg font-semibold">
${markerData.event_name} 
#${markerData.event_id}</h3>
<p class="text-sm mx-auto block">Players:  
${markerData.player_list.length}/${markerData.maximum_players}</p>`; 
	// Added closing backtick here

	const button = document.createElement('button');
	button.innerHTML = 'Join Match';
	button.className =
		'mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700'+
		'focus:outline-none focus:shadow-outline-orange'+
		'active:bg-orange-800 mx-auto block';
	button.id = 'joinButton'; // Added id to the button

	button.onclick = function () {
		joinEventId.set(markerData.event_id);
		showJoinModal.set(true);
	};

	div.appendChild(button);

	return div;
}
