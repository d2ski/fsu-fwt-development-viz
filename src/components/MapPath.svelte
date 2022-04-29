<script>
  export let path;
  export let centroid;
  export let isHoverable;
  export let properties;
  export let className = "";
</script>

<path
  d={path}
  class={className}
/>
<text x={centroid[0]} y={centroid[1]}>Label</text>

<style>
    text {
        text-anchor: middle;
        font-size: 0.3rem;
    }
</style>