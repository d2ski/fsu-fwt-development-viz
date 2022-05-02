<script>
  import { fade } from "svelte/transition";

  export let path;
  export let rec;
  export let rotate;
  export let shift = [];

  const [cx, cy] = path.centroid(rec);
  const [scx = 0, scy = 0] = shift;

  console.log(shift);
</script>

<text x={cx + scx} y={cy + scy} transform="rotate({-rotate})" transition:fade={{duration: 1000}}
  >{rec.properties.name}</text
>

<style>
  text {
    text-anchor: start;
    font-size: 0.35rem;
    fill: #212121;
    paint-order: stroke;
    stroke: #fff;
    stroke-width: 1px;
    font-weight: 600;
    transform-box: fill-box;
  }
</style>
