<script>
  import SlopeChartMarker from "$components/SlopeChartMarker.svelte";

  export let lines;
  export let w;
  export let h;
  export let padding;
  export let shiftLabels = [];

  $: width = w + padding.r + padding.l;
  $: height = h + padding.t + padding.b;

  const labelsPadding = 5;
  const labels = lines.slice();

  shiftLabels.shift.forEach(shiftLbl => {
    const lbl = labels.find(el => el[shiftLabels.key] === shiftLbl[0]);
    lbl.lblPos = lbl.y2 + shiftLbl[1];
  })

</script>

<div class="chart">
  <svg {width} {height}>
    <defs>
      <SlopeChartMarker id="dot" size="3" fill="#E0E0E0" />
      <SlopeChartMarker id="dot-active" size="3" fill="#D50000" />
    </defs>

    <g class="chart__lines" transform={`translate(${padding.l}, ${padding.t})`}>
      {#each lines as { x1, x2, y1, y2, country, isActive }}
        <line
          {x1}
          {x2}
          {y1}
          {y2}
          id={country}
          class:active={isActive}
          marker-start={isActive ? "url(#dot-active)" : "url(#dot)"}
          marker-end={isActive ? "url(#dot-active)" : "url(#dot)"}
        />
      {/each}
    </g>

    <g
      class="chart__labels"
      transform={`translate(${padding.l + w + labelsPadding}, ${padding.t})`}
    >
      {#each labels as { lblPos, y2, country, isActive }}
        <text y={lblPos || y2} class:active={isActive}>{country}</text>
      {/each}
    </g>
  </svg>
</div>

<style>
  svg {
    background-color: #fff;
    border: 1px solid black;
  }

  .chart__lines {
    stroke: #e0e0e0;
    stroke-width: 2px;
  }

  .chart__lines .active {
    stroke: #d50000;
  }

  .chart__lines line {
    cursor: pointer;
  }

  .chart__labels {
    fill: #e0e0e0;
  }

  .chart__labels .active {
    fill: #d50000;
  }

  .chart__labels text {
    font-size: 1.25rem;
    transform: translateY(2px);
  }
</style>
