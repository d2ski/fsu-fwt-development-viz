<script>
  import { viewport } from "$actions/viewport.js";
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
    Eastern European countries were influenced by this process as well. In the
    meantime, Soviet Union abandoned the policy of using its military power for
    supporting foreign communist governments.
  </p>
  <div class="map-scroller-container">
    <MapScroller />
  </div>
  <p>
    Following the Soviet Union and the Warsaw Pact collapse, all former
    communist countries transformed their economies into a market economy. But
    not all countries have succeeded the same way based on such development
    indicators as GDP per capita and life expectancy.
  </p>
  <p>
    <mark class="highlight fwt">The former Warsaw Pact countries</mark> and
    <mark class="highlight fsu-b">the Baltic states</mark>
    were initially oriented towards the western economies and integrated into
    the European Union. These countries achieved better results than
    <mark class="highlight fsu">the rest of former USSR countries</mark>.
  </p>
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
