<script>
  import { createEventDispatcher } from "svelte";
  export let data;
  export let chartID;
  export let isReferenceLine = false;
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

  let markerURL = `url(#${chartID}Dot)`;
  if (data.isActive) markerURL = `url(#${chartID}DotActive)`;
  if (isReferenceLine) markerURL = `url(#${chartID}DotReference)`;
</script>

<line
  x1={data.x1}
  x2={data.x2}
  y1={data.y1}
  y2={data.y2}
  id={data.country}
  class:active={data.isActive}
  class:hovered={isHovered}
  class:reference={isReferenceLine}
  marker-start={markerURL}
  marker-end={markerURL}
  on:mouseenter={lineEnter}
  on:mouseleave={lineLeave}
/>
<text
  x={data.x2 + labelPadding}
  y={data.lblPos || data.y2}
  class:active={data.isActive}
  class:hovered={isHovered}
  class:reference={isReferenceLine}
  on:mousemove={lineEnter}
  on:mouseleave={lineLeave}>{data.country}</text
>

<style>
  line,
  text {
    cursor: pointer;
  }

  line {
    --_line-color: var(--line-color, #e0e0e0);

    stroke-width: 2px;
    stroke: var(--_line-color);
  }

  line.active {
    --_line-color-active: var(--line-color-active, #212121);
    stroke: var(--_line-color-active);
  }

  text {
    --_label-color: var(--label-color, #e0e0e0);

    fill: var(--_label-color);
    font-size: 1.25rem;
    transform: translateY(3px);
  }

  text.active {
    --_label-color-active: var(--label-color-active, #212121);

    fill: var(--_label-color-active);
  }

  line.hovered {
    stroke-width: 4px;
  }

  text.hovered {
    transform: translate(2px, 2px);
    font-weight: 600;
  }

  line.reference {
    --_line-color-reference: var(--line-color-reference, #212121);
    stroke: var(--_line-color-reference);
    stroke-dasharray: 4 4;
  }

  text.reference {
    --_label-color-reference: var(--label-color-reference, #212121);

    fill: var(--_label-color-reference);
  }
</style>
