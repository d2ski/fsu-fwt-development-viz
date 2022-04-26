<script>
  import SlopeChartMarker from "$components/SlopeChartMarker.svelte";
  import SlopeChartLine from "$components/SlopeChartLine.svelte";
  import { end_hydrating } from "svelte/internal";

  export let lines;
  export let w;
  export let h;
  export let padding;
  export let shiftLabels = [];

  $: width = w + padding.r + padding.l;
  $: height = h + padding.t + padding.b;

  const labelPadding = 5;
  let showTooltip = false;
  let tooltip = {};
  let tooltipTranslate = `transform: translateY(0);`;

  // shifted labels will have `lblPos` property
  shiftLabels.shift.forEach((shiftLbl) => {
    const lbl = lines.find((el) => el[shiftLabels.key] === shiftLbl[0]);
    lbl.lblPos = lbl.y2 + shiftLbl[1];
  });

  const handleLineEnter = function (e) {
    console.log("lineEnter", e);
    showTooltip = true;
    tooltip.country = e.detail.country;
    tooltip.value = e.detail.value;
    tooltip.pctChange = e.detail.pctChange;
    tooltipTranslate = `transform: translate(${e.detail.mouseX - 25}px, ${
      e.detail.mouseY + 25
    }px);`;
  };

  const handleLineLeave = function (e) {
    showTooltip = false;
  };
</script>

<div class="chart">
  <svg {width} {height}>
    <defs>
      <SlopeChartMarker id="dot" size="3" fill="#E0E0E0" />
      <SlopeChartMarker id="dot-active" size="3" fill="#D50000" />
    </defs>

    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as line}
        <SlopeChartLine
          data={line}
          {labelPadding}
          on:lineEnter={handleLineEnter}
          on:lineLeave={handleLineLeave}
        />
      {/each}
    </g>
  </svg>

  {#if showTooltip}
    <div class="chart__tooltip" style={tooltipTranslate}>
      <p>1991 🠒 2021</p>
      <p>{tooltip.value}</p>
      <p>{tooltip.pctChange}</p>
    </div>
  {/if}
</div>

<style>
  svg {
    background-color: #fff;
    border: 1px solid black;
  }

  :global(.chart__lines line) {
    stroke: #e0e0e0;
    stroke-width: 2px;
  }

  :global(.chart__lines line.active) {
    stroke: #d50000;
  }

  :global(.chart__lines line.hovered) {
    filter: drop-shadow(0 0 2px #424242);
  }

  :global(.chart__lines text) {
    font-size: 1.25rem;
    transform: translateY(3px);
    fill: #e0e0e0;
  }

  :global(.chart__lines text.hovered) {
    filter: drop-shadow(0 0 2px #424242);
    fill: #fff;
  }

  :global(.chart__lines text.active) {
    fill: #d50000;
  }

  :global(.chart__lines text.active.hovered) {
    fill: #ff1744;
  }

  .chart {
    position: relative;
    display: inline-block;
  }

  .chart__tooltip {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(33, 33, 33, 0.7);
    color: #fff;
    width: 100px;
    height: 75px;
  }
</style>
