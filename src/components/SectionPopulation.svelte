<script>
  import { scaleLinear, scaleBand, extent, sort } from "d3";

  import data from "$data/POPPCT.json";

  import LollipopChart from "$components/LollipopChart.svelte";
  import { getClassName } from "$utils/helpers.js";

  const padding = { t: 50, r: 200, b: 25, l: 60 };
  const w = 600 - padding.r - padding.l;
  const h = 450 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.pctChange);
  const domainCountries = sort(data, (rec) => -rec.pctChange).map(
    (rec) => rec.countryName
  );

  const xScale = scaleLinear().domain(domainValues).range([0, w]).nice();
  const yScale = scaleBand().domain(domainCountries).range([0, h]);

  const generateLines = function (data) {
    const lines = data.map((rec) => {
      return {
        className: getClassName(rec),
        value: rec.pctChange,
        valueTab: `${(rec.value / 1e6).toFixed(1)} mln`,
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

  const ticksX = xScale.ticks(4).map((d) => {
    return {
      label: d === 0 ? `${d}` : `${d}%`,
      x: xScale(d),
    };
  });
</script>

<section>
  <h2 class="section__header">Population</h2>

  <div class="section__content">
    <p>
      Most of the former Soviet bloc countries experienced population decrease
      during the period of 1991 - 2020. Especially Baltic states Lithuania and
      Latvia where the population loss was the highest. However, in the ex-USSR
      countries of Central Asia population growth was rapid.
    </p>
  </div>

  <div class="section__charts section-scroll-h">
    <LollipopChart
      {lines}
      {w}
      {h}
      {padding}
      {ticksX}
      markSize="4"
      title="Population % change, 1991-2020"
      tabTitle="Population in 2020"
      chartID="popChgPctChart"
    />
  </div>


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
