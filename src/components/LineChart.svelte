<script>
  import BaseChart from "$components/BaseChart.svelte";
  import BaseChartTooltip from "$components/BaseChartTooltip.svelte";

  export let chartID;
  export let w;
  export let h;
  export let padding;

  export let lines;

  export let ticksX;
  export let ticksY;
  export let title = "";
  export let hoverKey = undefined;

  export let highlights = [];

  let tooltip = { show: false, x: 0, y: 0, content: [""] };

  const lineEnter = (e, line) => {
    lines = lines
      .map((l) => {
        return {
          ...l,
          muted: l?.[hoverKey] === line?.[hoverKey] ? false : true,
        };
      })
      .sort((l) => -l.muted);

    tooltip.show = true;
    tooltip.x = e.offsetX;
    tooltip.y = e.offsetY;
    tooltip.content = [line.countryName];
    tooltip = tooltip;
  };

  const lineLeave = (line) => {
    lines = lines.map((l) => {
      return {
        ...l,
        muted: false,
      };
    });

    tooltip.show = false;
    tooltip = tooltip;
  };
</script>

<BaseChart {w} {h} {padding} {ticksX} {ticksY} {title} {chartID}>
  <g slot="chart">
    <g
      class="chart__highlights"
      transform={`translate(${padding.l}, ${padding.t})`}
    >
      {#each highlights as { x1, x2 }}
        <rect x={x1} y="0" width={x2 - x1} height={h} />
        <line {x1} y1={h} y2={h} {x2} />
        <line {x1} y1={0} y2={0} {x2} />
      {/each}
    </g>
    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as line}
        <path
          d={line.path}
          on:mouseenter={(e) => lineEnter(e, line)}
          on:mouseleave={() => lineLeave(line)}
          class:muted={line.muted}
        />
      {/each}
    </g>
  </g>

  <BaseChartTooltip slot="tooltip" {tooltip} />
</BaseChart>

<style>
  path {
    stroke: #212121;
    stroke-width: 2px;
    fill: none;
    cursor: pointer;
  }

  rect {
    fill: #212121;
    opacity: 0.3;
  }

  line {
    stroke: #212121;
    stroke-width: 4px;
  }
</style>
