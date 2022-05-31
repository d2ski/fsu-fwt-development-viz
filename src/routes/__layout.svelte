<script>
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import "$styles/global.css";

  let isLoaded = false;

  onMount(() => {
    isLoaded = true;
  });
</script>

<svelte:head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title
    >Visualizing economic development of the former USSR and the Warsaw Treaty
    Organization (Pact) countries
  </title>
  <meta
    name="description"
    content="Visualizing key economic development indicators of the former Soviet bloc countries for the period from 1991 to 2020: GDP per capita, GDP growth, population and life expectancy."
  />

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

  <meta name="author" content="ohmychart.com" />
  <link
    rel="apple-touch-icon"
    sizes="180x180"
    href="{base}/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="32x32"
    href="{base}/favicon-32x32.png"
  />
  <link
    rel="icon"
    type="image/png"
    sizes="16x16"
    href="{base}/favicon-16x16.png"
  />
  <link rel="manifest" href="{base}/site.webmanifest" />
</svelte:head>

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
