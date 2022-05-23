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

<Scroller top={0.05} bottom={1} bind:index bind:offset bind:progress>
  <div slot="background">
    {#if index < 1}
      <div class="map-container">
        <Map data={map1988} {width} {height} {scale} {rotate} {center} />
      </div>
    {:else if index >= 1}
      <div class="map-container">
        <Map data={map1993} {width} {height} {scale} {rotate} {center} />
      </div>
    {/if}
  </div>

  <div slot="foreground" style="padding: 0 0 0 50%;">
    <section>
      <p>
        In 1989 pro-Soviet regimes of the former Warsaw Pact countries Poland,
        Hungary, East Germany, Czechoslovakia, Bulgaria and Romania had fallen
        in a few months as a result of peaceful revolutions (except Romania -
        not so peaceful). No communist country left in Eastern Europe.
      </p>
    </section>
    <section>
      <p>
        By the end of 1991 the Soviet Union collapsed. Former soviet republics
        became independent states: Estonia, Lithuania,
        Latvia, Azerbaijan, Georgia, Russia, Uzbekistan, Moldova, Belarus,
        Turkmenistan, Tajikistan, Kazakhstan, Kyrgyzstan.
      </p>
    </section>
    <section class="scroll-end">
      <p>
      </p>
    </section>
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
    width: 50%;
    display: inline-block;
    border: 2px solid #e0e0e0;
  }

  section {
    height: 80vh;
    font-size: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  section.scroll-end {
    height: 50px;
    margin: 1rem 0 0 -100%;
  }

  p {
    padding: 0 3rem;
  }
</style>
