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

<Scroller top={0.01} bottom={1} bind:index bind:offset bind:progress>
  <div slot="background">
    {#if index < 1}
      <div class="map-container">
        <Map
          data={map1988}
          {width}
          {height}
          {scale}
          {rotate}
          {center}
          title={1989}
        />
      </div>
    {:else if index >= 1}
      <div class="map-container">
        <Map
          data={map1993}
          {width}
          {height}
          {scale}
          {rotate}
          {center}
          title="1991*"
          note="*Czechoslovakia split into Czech Republic and Slovakia in 1993"
        />
      </div>
    {/if}
  </div>

  <div slot="foreground" style="padding: 0 0 0 50%;">
    <section>
      <p>
        In 1989 pro-Soviet regimes of <mark class="highlight fwt"
          >former Warsaw Pact countries</mark
        > Poland, Hungary, East Germany, Czechoslovakia, Bulgaria and Romania had
        fallen in a few months as a result of peaceful revolutions (except Romania
        - not so peaceful). No communist country left in Eastern Europe.
      </p>
    </section>
    <section>
      <p>
        Political liberalization and the economic crisis have also intensified
        requests for political and economic autonomy in the Soviet republics. By
        late 1991, the USSR had collapsed.
      </p>
    </section>
    <section>
      <p>
        First republics to declare a sovereignty were <mark class="highlight fsu-b">Baltic states</mark>: Estonia, Lithuania and Latvia.
      </p>
    </section>
    <section>
      <p>
        Soon <mark
          class="highlight fsu">other former soviet republics</mark
        >
        became independent states: Azerbaijan, Georgia,
        Russia, Uzbekistan, Moldova, Belarus, Turkmenistan, Tajikistan, Kazakhstan,
        Kyrgyzstan.
      </p>
    </section>

  </div>
</Scroller>

<style>
  [slot="background"] {
    position: relative;
  }

  [slot="foreground"] {
    margin-bottom: 3rem;
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
    height: 90vh;
    font-size: 3.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  p {
    padding: 0 3rem;
  }
</style>
