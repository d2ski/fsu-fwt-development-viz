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
          hovered: l?.[hoverKey] === line?.[hoverKey] ? true : false,
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
        hovered: false,
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
      {#each highlights as { x1, x2, label }}
        <rect x={x1} y="0" width={x2 - x1} height={h} />
        <line {x1} y1={h} y2={h} {x2} />
        <line {x1} y1={0} y2={0} {x2} />
        <text x={x1 + (x2 - x1)*0.5} y={label.h*h}>{label.content}</text>
      {/each}
    </g>
    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as line}
        <path
          d={line.path}
          on:mouseenter={(e) => lineEnter(e, line)}
          on:mouseleave={() => lineLeave(line)}
          class:muted={line.muted}
          class:hovered={line.hovered}
        />
      {/each}
    </g>
  </g>

  <BaseChartTooltip slot="tooltip" {tooltip} />
</BaseChart>

<style>
  path {
    --_line-color: var(--line-color, #212121);

    stroke: var(--_line-color);
    stroke-width: 2px;
    fill: none;
    cursor: pointer;
  }

  path.muted {
    --_line-color-muted: var(--line-color-muted, #e0e0e0);

    stroke: var(--_line-color-muted);
  }

  path.hovered {
    stroke-width: 4px;
  }

  rect {
    --_highlight-color: var(--highlight-color, #212121);

    fill: var(--_highlight-color);
    opacity: 0.3;
  }

  line {
    --_highlight-color: var(--highlight-color, #212121);

    stroke: var(--_highlight-color);
    stroke-width: 4px;
  }

  text {
    font-size: 1.25rem;
    fill: #616161;
  }
</style>
