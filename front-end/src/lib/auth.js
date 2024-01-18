import { navigate } from 'svelte-routing';

export async function checkAuth(fetch) {
	try {
		const response = await fetch('http://localhost:3010/check-auth', {
			credentials: 'include'
		});

		if (response.ok) {
			const data = await response.json();
			const userId = data.userId;
			return userId;
		} else {
			const errorData = await response.json();
			const errorMessage = errorData.message || 'Authentication failed';
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error('Authentication error:', error);
		navigate('/user/login');
		window.location.reload();
	}
	return null;
}
