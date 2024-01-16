export default async function playerListToNames(playerlist) {
	const names = [];
	for (const playerId of playerlist) {
		const response = await fetch(`http://localhost:3010/users/${playerId}`);
		const user = await response.json();
		names.push({ id: playerId, name: user.name, 
			user_name: user.user_name });
	}
	return names;
}
