<script>
  import BaseChart from "$components/BaseChart.svelte";
  import BaseChartTooltip from "$components/BaseChartTooltip.svelte";

  export let chartID;
  export let w;
  export let h;
  export let padding;

  export let dots;
  export let line;
  export let r = 5;
  export let zeroY = undefined;

  export let ticksX;
  export let ticksY;
  export let title = "";
  export let hoverKey = undefined;

  let tooltip = { show: false, x: 0, y: 0, content: [""] };
</script>

<BaseChart {w} {h} {padding} {ticksX} {ticksY} {title} {chartID}>
  <g slot="chart">
    <g
      class="chart__domain"
      transform={`translate(${padding.l}, ${padding.t})`}
    >
      {#each ticksX as { x }}
        <line x1={x} x2={x} y1={0} y2={h} />
      {/each}

      {#if zeroY}
        <line x1={0} x2={w} y1={zeroY} y2={zeroY} class="zero-line" />
      {/if}
    </g>
    <g class="chart__line" transform={`translate(${padding.l}, ${padding.t})`}>
      <path d={line} />
    </g>
    <g class="chart__dots" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each dots as { cx, cy, countryName, value }}
        <circle {cx} {cy} {r} data-country={countryName} data-value={value} />
      {/each}
    </g>
  </g>
</BaseChart>

<style>
  circle {
    --_dot-color: var(--dot-color, #212121);

    fill: var(--_dot-color);
    fill-opacity: 0.35;
    stroke: none;
  }

  .chart__domain line {
    stroke: #e0e0e0;
    stroke-width: 1px;
  }

  .chart__domain line.zero-line {
    stroke: #757575;
    stroke-width: 1px;
    stroke-opacity: 0.4;
    stroke-dasharray: 6 3;
  }

  .chart__line path {
    --_line-color: var(--line-color, #e0e0e0);

    fill: none;
    stroke-width: 2px;
    stroke: var(--_line-color);
  }
</style>
