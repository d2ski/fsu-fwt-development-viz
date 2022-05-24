<script>
  import {viewport} from "$actions/viewport.js";
  import MapScroller from "$components/MapScroller.svelte";
</script>

<section>
  <h2 class="section__header" use:viewport on:enterViewport>
    Dissolution of the Soviet Union and the Warsaw Pact
  </h2>
  <p>
    In the mid-1980s, the Soviet Union launched a series of liberal political
    and economic reforms, widely known as perestroika. It led to liberalization
    of political institutions, censorship decrease and broad freedom of
    information.
  </p>
  <p>
    Eastern European countries were influenced by this process as well. In
    the meantime, Soviet Union abandoned the policy of using its military power for
    supporting foreign communist governments.
  </p>
  <div class="map-scroller-container">
    <MapScroller />
  </div>
</section>

<style>
  .map-scroller-container {
    display: block;
    padding-top: 3rem;
  }

  section {
    max-width: 95%;
  }
</style>
