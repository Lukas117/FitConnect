<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		try {
			// Invalidate the cookie by setting its expiration date to a past date
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

			// After logging out, redirect to the login page
			window.location.href = '/user/login';
		} catch (error) {
			console.error('Logout error:', error);
		}
	});
</script>

<main>
	<h1>Logging out...</h1>
</main>
