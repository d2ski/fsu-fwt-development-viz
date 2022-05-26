<script>
  import {width} from "$stores/window.js";
  import Header from "$components/Header.svelte";
  import SectionMap from "$components/SectionMap.svelte";
  import SectionGdp from "$components/SectionGDP.svelte";
  import SectionGdpGrowth from "$components/SectionGDPGrowth.svelte";
  import SectionPopulation from "$components/SectionPopulation.svelte";
  import SectionLifeExp from "$components/SectionLifeExp.svelte";
  import Footer from "$components/Footer.svelte";

  let isHeaderPassed = false;
</script>

<svelte:window bind:innerWidth={$width} />

<Header {isHeaderPassed} />
<SectionMap on:enterViewport={() => (isHeaderPassed = true)} />
<SectionGdp />
<SectionGdpGrowth />
<SectionPopulation />
<SectionLifeExp />
<Footer />
