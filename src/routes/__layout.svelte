<script>
  import { onMount } from "svelte";
  import "$styles/global.css";

  let isLoaded = false;

  onMount(() => {
    isLoaded = true;
  });
</script>

{#if !isLoaded}
<div class="loader">
    <p>Loading...</p>
</div>  
{/if}

<main class="content">
  <slot />
</main>

<style>
    .loader {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        display: grid;
        place-items: center;
        background-color: #f8f8f8;
        z-index: 9999;
        font-size: 1.5rem;
    }
</style>