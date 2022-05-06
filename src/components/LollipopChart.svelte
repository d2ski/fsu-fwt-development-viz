<script>
  import BaseChart from "$components/BaseChart.svelte";

  export let chartID;
  export let w;
  export let h;
  export let padding;

  export let lines;

  export let ticksX;
  export let ticksY;
  export let title = "";
  export let tabTitle = "";

  export let markSize = 4;
</script>

<BaseChart {w} {h} {padding} {ticksX} {ticksY} {title} {chartID}>
  <g slot="chart">
    <g
      class="chart__domain"
      transform={`translate(${padding.l}, ${padding.t})`}
    >
      <line x1={lines[0].x1} x2={lines[0].x1} y1={0} y2={h} />
    </g>

    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as { x1, x2, y1, className, value, xLabel, yLabel, valueTab }}
        <line {x1} {x2} {y1} y2={y1} class={className} />
        <circle cx={x2} cy={y1} r={markSize} class={className} />
        <text x={x2} y={y1} class={value >= 0 ? "pos-x-lbl" : "neg-x-lbl"}
          >{xLabel}</text
        >
        <text x={x1} y={y1} class={value >= 0 ? "pos-y-lbl" : "neg-y-lbl"}
          >{yLabel}</text
        >

        <text x={(w + padding.r) * 0.8} y={y1} class="tab-text">{valueTab}</text
        >
      {/each}
      <text x={(w + padding.r) * 0.8} y={0} class="tab-title">{tabTitle}</text>
    </g>
  </g>
</BaseChart>

<style>
  .chart__lines line {
    stroke-width: 4px;
  }

  .chart__domain line {
    stroke-width: 2px;
    stroke: #e0e0e0;
    stroke-dasharray: 3 3;
  }

  text {
    font-size: 1.25rem;
    fill: #212121;
  }

  text.pos-x-lbl {
    text-anchor: start;
    transform: translate(12px, 4px);
  }

  text.neg-x-lbl {
    text-anchor: end;
    transform: translate(-12px, 4px);
  }

  text.pos-y-lbl {
    text-anchor: end;

    transform: translate(-12px, 4px);
  }

  text.neg-y-lbl {
    text-anchor: start;
    transform: translate(12px, 4px);
  }

  text.tab-text {
    fill: #9e9e9e;
  }

  text.tab-title {
    transform: translateY(-2rem);
    font-weight: 500;
    text-anchor: start;
  }
</style>
