<script>
  import SlopeChartMarker from "$components/SlopeChartMarker.svelte";
  import SlopeChartLine from "$components/SlopeChartLine.svelte";

  export let lines;
  export let w;
  export let h;
  export let padding;
  export let shiftLabels = [];
  export let ticksX;
  export let ticksY;
  export let title = "";

  $: width = w + padding.r + padding.l;
  $: height = h + padding.t + padding.b;

  const labelPadding = 5;
  const xTicksSize = 7;
  const yTicksSize = 7;

  let showTooltip = false;
  let tooltip = {};
  let tooltipTranslate = `transform: translateY(0);`;

  // shifted labels will have `lblPos` property
  shiftLabels.shift.forEach((shiftLbl) => {
    const lbl = lines.find((el) => el[shiftLabels.key] === shiftLbl[0]);
    lbl.lblPos = lbl.y2 + shiftLbl[1];
  });

  const handleLineEnter = function (e) {
    showTooltip = true;
    tooltip.country = e.detail.country;
    tooltip.value = e.detail.value;
    tooltip.pctChange = e.detail.pctChange;
    tooltip.value1 = e.detail.value1;
    tooltip.value2 = e.detail.value2;
    tooltipTranslate = `transform: translate(${e.detail.mouseX - 25}px, ${
      e.detail.mouseY + 47
    }px);`;
  };

  const handleLineLeave = function (e) {
    showTooltip = false;
  };

  const fmtValueStr = function (value, round = 1) {
    if (value === 0) return "0";
    return `$${(value / 1000).toFixed(round)}k`;
  };
</script>

<figure class="chart">
  <figcaption class="chart__title">{title}</figcaption>
  <svg width="{width}px" height="{height}px" viewBox="0 0 {width} {height}">
    <defs>
      <SlopeChartMarker id="dot" size="3" fill="#E0E0E0" />
      <SlopeChartMarker id="dot-active" size="3" fill="#D50000" />
    </defs>

    <g class="chart__domain">
      <line x1="{padding.l}" x2="{padding.l}" y1="{padding.t}" y2="{padding.t + h}" />
      <line x1="{w + padding.l}" x2="{w + padding.l}" y1="{padding.t}" y2="{padding.t + h}"  />
    </g>

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
          <text y={tick.y} x={-yTicksSize * 2}
            >{fmtValueStr(tick.label, 0)}</text
          >
        </g>
      {/each}
    </g>
  </svg>

  {#if showTooltip}
    <div class="chart__tooltip" style={tooltipTranslate}>
      <p class="chart__tooltip__text">
        {fmtValueStr(tooltip.value1)} 🠒 {fmtValueStr(tooltip.value2)}
      </p>
      <p class="chart__tooltip__text">{tooltip.pctChange.toFixed(1)}%</p>
    </div>
  {/if}
</figure>

<style>
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

  .chart__title {
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
    color: #212121;
  }

  .chart__tooltip {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(33, 33, 33, 0.65);
    color: #fff;
    width: 11rem;
    height: 4rem;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .chart__tooltip__text {
    font-size: 1.25rem;
    line-height: 1.5rem;
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

  .chart__domain line {
    stroke-width: 1px;
    stroke: #e0e0e0;
    stroke-opacity: 0.7;
    stroke-dasharray: 3 3;
  }
</style>
