<script>
import SideBar from "$lib/SideBar.svelte";

export let title = "";
export let enableSideBar = true;

</script>

<header class="fixed pt-4 w-full bg-white p-6 text-center z-50">
    <h1 class="text-4xl font-bold">{title}</h1>
    {#if enableSideBar}
        <div class="fixed top-0.5 right-0 focus:outline-none outline-none">
            <SideBar />
        </div>
    {/if}
</header>