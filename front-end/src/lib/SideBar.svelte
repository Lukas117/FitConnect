<script>
    import { clickOutside } from "./clickOutside";

    let isSidebarOpen = false;

    const toggleSidebar = () => {
        isSidebarOpen = !isSidebarOpen;
    };

    const closeSidebar = () => {
        isSidebarOpen = false;
    };

    function handleClickOutside(event) {
		closeSidebar();
	}
</script>

<style>
    .sidebar {
        transition: transform 0.3s ease-in-out;
    }

    .sidebar-closed {
        transform: translateX(100%);
    }

    .overlay {
        transition: opacity 0.5s ease-in-out; /* Add transition for opacity property */
    }

    .overlay-hidden {
        transition: opacity 0.5s ease-in-out;
        opacity: 0;
        pointer-events: none; /* Disable pointer events when hidden */
    }
</style>

<div class="flex flex-col justify-center items-center h-screen bg-background relative">
    <div class="absolute top-0 right-0 m-4">
        <!-- Hamburger Icon for Sidebar Toggle -->
        <button class="text-3xl cursor-pointer" on:click={toggleSidebar}>
            &#x2630;
        </button>

        <!-- Account Sidebar -->
        <div class={`fixed top-0 right-0 h-screen sm:w-1/3 lg:w-1/5 bg-white shadow-md p-4 z-10 sidebar ${isSidebarOpen ? '' : 'translate-x-full'}`} use:clickOutside on:click_outside={handleClickOutside}>
            <!-- Sidebar content goes here -->
            <button class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                Profile
            </button>
            <button class="block px-4 py-2 text-gray-800 hover:bg-gray-200" on:click={closeSidebar}>
                Settings
            </button>
            <button class="block px-4 py-2 text-gray-800 hover:bg-gray-200" on:click={closeSidebar}>
                Logout
            </button>
        </div>

        <div class={`fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 ${isSidebarOpen ? 'overlay' : 'overlay-hidden'}`} on:click={closeSidebar}></div>

    </div>
</div>
