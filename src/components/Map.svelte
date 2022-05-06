<script>
  import { geoPath, geoStereographic } from "d3";
  import MapPath from "$components/MapPath.svelte";
  import MapLabel from "$components/MapLabel.svelte";
  import { getClassName } from "$utils/helpers.js";

  export let data;
  export let width;
  export let height;
  export let scale;
  export let rotate;
  export let center;

  const strokeWidth = 1 / scale;

  const projection = geoStereographic().center(center);
  const path = geoPath().projection(projection);

  const showLabel = function (rec) {
    return rec.properties.group !== "NGHBR";
  };

  const shiftLabel = {
    "Soviet Union": [-30, 115],
    Russia: [-30, 115],
    "East Germany": [-7, 3],
    Czechoslovakia: [-1.5, 1],
    Armenia: [-2, 0],
    Romania: [-7, 3],
    Moldova: [-1, 3],
    Ukraine: [-3, -1],
    Hungary: [-1, 1.5],
    Poland: [-7, 0],
    "Czech Republic": [-1.5, 1],
    Latvia: [-2, 0.5],
    Estonia: [-1.5, 0],
  };
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  <g
    class="map"
    transform="scale({scale}) rotate({rotate})"
    style="stroke-width: {strokeWidth}px"
  >
    {#each data.features as rec}
      <MapPath {path} {rec} className={getClassName(rec)} />
    {/each}

    {#each data.features as rec}
      {#if showLabel(rec)}
        <MapLabel
          {path}
          {rec}
          {rotate}
          shift={shiftLabel[rec.properties.name]}
        />
      {/if}
    {/each}
  </g>
</svg>

<style>
  :global(path.fsu-state) {
    stroke: #e0e0e0;
    fill: #800000;
  }

  :global(path.fsu-b-state) {
    stroke: #e0e0e0;
    fill: #d3543f;
  }

  :global(path.fwt-state) {
    stroke: #e0e0e0;
    fill: #ffb495;
  }

  :global(path.neighbour-state) {
    stroke: #e0e0e0;
    fill: #f5f5f5;
    opacity: 0.55;
  }

  svg {
    background-color: #fff;
    display: block;
  }
</style>
