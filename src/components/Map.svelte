<script>
  import { geoPath, geoStereographic } from "d3";
  import MapPath from '$components/MapPath.svelte';

  export let data;
  export let width;
  export let height;
  export let scale;
  export let rotate;
  export let center;
  export let isHoverable = false;

  const strokeWidth = 1 / scale;

  const projection = geoStereographic().center(center);
  const path = geoPath().projection(projection);

  const getClassName = function(stateGroup) {
    if (stateGroup === 'FWT') return 'fwt-state';
    if (stateGroup === 'FSU') return 'fsu-state';
    if (stateGroup === 'NGHBR') return 'neighbour-state';
    return '';
  }
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
  <g
    class="map"
    transform="scale({scale}) rotate({rotate})"
    style="stroke-width: {strokeWidth}px"
  >
    {#each data.features as rec}
    <MapPath path={path(rec)} centroid={path.centroid(rec)} className={getClassName(rec.properties.group)}/>
    {/each}
  </g>
</svg>

<style>

  :global(path.fsu-state) {
    stroke: #e0e0e0;
    fill: #800000;
  }

  :global(path.fwt-state) {
    stroke: #e0e0e0;
    fill: #e66666;
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
