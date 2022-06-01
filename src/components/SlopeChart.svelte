<script>
  import BaseChart from "$components/BaseChart.svelte";
  import BaseChartTooltip from "$components/BaseChartTooltip.svelte";
  import SlopeChartMarker from "$components/SlopeChartMarker.svelte";
  import SlopeChartLine from "$components/SlopeChartLine.svelte";

  export let chartID;
  export let lines;
  export let w;
  export let h;
  export let padding;
  export let shiftLabels = { shift: [] };
  export let ticksX;
  export let ticksY;
  export let title = "";
  export let fmtValueStr;
  export let referenceLine = undefined;

  const labelPadding = 5;

  let tooltip = { show: false, x: 0, y: 0, content: [""] };

  // shifted labels will have `lblPos` property
  $: shiftLabels.shift.forEach((shiftLbl) => {
    const lbl = lines.find((el) => el[shiftLabels.key] === shiftLbl[0]);
    lbl.lblPos = lbl.y2 + shiftLbl[1];
  });

  const handleLineEnter = function (e) {
    tooltip.show = true;
    tooltip.x = e.detail.mouseX;
    tooltip.y = e.detail.mouseY;
    tooltip.content = [
      `${fmtValueStr(e.detail.value1)} 🠒 ${fmtValueStr(e.detail.value2)}`,
      `${e.detail.pctChange.toFixed(1)}%`,
    ];
    tooltip = tooltip;
  };

  const handleLineLeave = function (e) {
    tooltip.show = false;
    tooltip = tooltip;
  };
</script>

<BaseChart {w} {h} {padding} {ticksX} {ticksY} {title} {chartID}>
  <defs slot="markers">
    <SlopeChartMarker id={`${chartID}Dot`} size="3" fill="--line-color" />
    <SlopeChartMarker
      id={`${chartID}DotActive`}
      size="3"
      fill="--line-color-active"
    />
    <SlopeChartMarker
      id={`${chartID}DotReference`}
      size="3"
      fill="--line-color-reference"
    />
  </defs>

  <g slot="chart">
    <g class="chart__domain">
      <line x1={padding.l} x2={padding.l} y1={padding.t} y2={padding.t + h} />
      <line
        x1={w + padding.l}
        x2={w + padding.l}
        y1={padding.t}
        y2={padding.t + h}
      />
    </g>

    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as line}
        <SlopeChartLine
          data={line}
          {chartID}
          {labelPadding}
          on:lineEnter={handleLineEnter}
          on:lineLeave={handleLineLeave}
          isReferenceLine={line?.[referenceLine.key] === referenceLine.value}
        />
      {/each}
    </g>
  </g>

  <BaseChartTooltip slot="tooltip" {tooltip} chartWidth={w} />
</BaseChart>

<style>
  .chart__domain line {
    stroke-width: 1px;
    stroke: #e0e0e0;
    stroke-opacity: 0.7;
    stroke-dasharray: 3 3;
  }
</style>
