<script>
  import { scaleLinear, scaleBand, extent, sort } from "d3";

  import data from "$data/POPPCT.json";

  import LollipopChart from "$components/LollipopChart.svelte";
  import {getClassName} from "$utils/helpers.js";

  const padding = { t: 55, r: 185, b: 25, l: 60 };
  const w = 450 - padding.r - padding.l;
  const h = 450 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.pctChange);
  const domainCountries = sort(data, rec => -rec.pctChange).map(rec => rec.countryName);

  const xScale = scaleLinear().domain(domainValues).range([0, w]).nice();
  const yScale = scaleBand().domain(domainCountries).range([0, h]);

  const generateLines = function (data) {
    const lines = data.map((rec) => {
      return {
        className: getClassName(rec),
        value: rec.pctChange,
        valueTab: `${(rec.value/1e6).toFixed(1)} mln`,
        xLabel: `${rec.pctChange.toFixed(1)}%`,
        yLabel: rec.countryName,
        x1: xScale(0),
        x2: xScale(rec.pctChange),
        y1: yScale(rec.countryName),
      };
    });

    return lines;
  };

  const lines = generateLines(data);

  const ticksX = xScale.ticks(4).map(d => {
    return {
      label: d,
      x: xScale(d)
    }
  });

  const ticksY = [];
</script>

<section>
  <LollipopChart
    {lines}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    markSize=4
    title="Population % change, 1991-2020"
    tabTitle="Total in 2020"
    chartID="popChgPctChart"
  />
</section>

<style>
  :global(#popChgPctChart line.fsu-state) {
    stroke: #800000;
  }

  :global(#popChgPctChart circle.fsu-state) {
    fill: #800000;
  }

  :global(#popChgPctChart line.fsu-b-state) {
    stroke: #d3543f;
  }

  :global(#popChgPctChart circle.fsu-b-state) {
    fill: #d3543f;
  }

  :global(#popChgPctChart line.fwt-state) {
    stroke: #ffb495;
  }

  :global(#popChgPctChart circle.fwt-state) {
    fill: #ffb495;
  }
</style>
