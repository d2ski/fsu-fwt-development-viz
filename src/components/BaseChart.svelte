<script>
  // export let lines;
  export let chartID;
  export let w;
  export let h;
  export let padding;

  export let ticksX = [];
  export let ticksY = [];
  export let title = "";

  const xTicksSize = 7;
  const yTicksSize = 7;

  $: width = w + padding.r + padding.l;
  $: height = h + padding.t + padding.b;
</script>

<figure class="chart" id="{chartID}">
  <figcaption class="chart__title">{title}</figcaption>
  <svg width="{width}px" height="{height}px" viewBox="0 0 {width} {height}" >
    <slot name="markers" />

    <slot name="chart" />

    <g
      class="chart__x-axis"
      transform={`translate(${padding.l}, ${padding.t + h})`}
    >
      {#each ticksX as tick}
        <g class="chart__x-axis__tick">
          <line x1={tick.x} x2={tick.x} y1="0" y2={xTicksSize} />
          <text x={tick.x} y={xTicksSize * 2.5}>{tick.label}</text>
        </g>
      {/each}
    </g>

    <g
      class="chart__y-axis"
      transform={`translate(${padding.l}, ${padding.t})`}
    >
      {#each ticksY as tick}
        <g class="chart__y-axis__tick">
          <line x1="0" x2={-yTicksSize} y1={tick.y} y2={tick.y} />
          <text y={tick.y} x={-yTicksSize * 2}>{tick.label}</text>
        </g>
      {/each}
    </g>
  </svg>
</figure>

<style>
  .chart {
    position: relative;
    display: inline-block;
  }

  .chart__title {
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
    color: #212121;
  }

  .chart__x-axis line {
    stroke-width: 1px;
    stroke: #212121;
  }

  .chart__x-axis__tick text {
    text-anchor: middle;
    font-size: 1.15rem;
    fill: #212121;
  }

  .chart__y-axis line {
    stroke-width: 1px;
    stroke: #212121;
  }

  .chart__y-axis__tick {
    transform: translateX(-7px);
  }

  .chart__y-axis__tick text {
    text-anchor: end;
    font-size: 1.15rem;
    fill: #212121;
    transform: translateY(0.3rem);
  }
</style>
