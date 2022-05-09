<script>
  import Scroller from "@sveltejs/svelte-scroller";

  import Map from "$components/Map.svelte";
  import map1988 from "$data/map-1988-s.json";
  import map1993 from "$data/map-1993-s.json";

  let index, offset, progress;

  const width = 600;
  const height = 600;
  const scale = 3.8;
  const rotate = 45;
  const center = [125, -11];
</script>

<Scroller top={0.05} bottom={0.8} bind:index bind:offset bind:progress>
  <div slot="background">
    {#if index === 0}
      <div class="map-container">
        <Map data={map1988} {width} {height} {scale} {rotate} {center} />
      </div>
    {:else if index === 1}
      <div class="map-container">
        <Map
          data={map1993}
          {width}
          {height}
          {scale}
          {rotate}
          {center}
        />
      </div>
    {/if}
  </div>

  <div slot="foreground" style="padding: 0 0 0 50%;">
    <section>1988</section>
    <section>1993</section>
  </div>
</Scroller>

<style>
  [slot="background"] {
    position: relative;
  }

  .map-container {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    border: 2px solid #e0e0e0;
  }

  section {
    height: 80vh;
    font-size: 3.5rem;
  }
</style>
