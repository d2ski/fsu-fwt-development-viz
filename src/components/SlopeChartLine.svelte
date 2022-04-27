<script>
  import { createEventDispatcher } from "svelte";
  export let data;
  export let labelPadding = 5;

  let isHovered = false;

  const dispatch = createEventDispatcher();

  const lineEnter = function (e) {
    isHovered = true;
    dispatch("lineEnter", {
      country: data.country,
      value1: data.value1,
      value2: data.value2,
      pctChange: data.pctChange,
      mouseX: e.offsetX,
      mouseY: e.offsetY,
    });
  };

  const lineLeave = function () {
    isHovered = false;
    dispatch("lineLeave", {
      country: data.country,
    });
  };
</script>

<line
  x1={data.x1}
  x2={data.x2}
  y1={data.y1}
  y2={data.y2}
  id={data.country}
  class:active={data.isActive}
  class:hovered={isHovered}
  marker-start={data.isActive ? "url(#dot-active)" : "url(#dot)"}
  marker-end={data.isActive ? "url(#dot-active)" : "url(#dot)"}
  on:mouseenter={lineEnter}
  on:mouseleave={lineLeave}
/>
<text
  x={data.x2 + labelPadding}
  y={data.lblPos || data.y2}
  class:active={data.isActive}
  class:hovered={isHovered}
  on:mousemove={lineEnter}
  on:mouseleave={lineLeave}>{data.country}</text
>

<style>
  line,
  text {
    cursor: pointer;
  }
</style>
