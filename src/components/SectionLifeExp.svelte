<script>
  import { scaleLinear, extent, group, line } from "d3";
  import data from "$data/LETS.json";

  import LineChart from "$components/LineChart.svelte";

  const padding = { t: 55, r: 55, b: 25, l: 55 };
  const w = 350 - padding.r - padding.l;
  const h = 350 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.value);
  const domainYears = extent(data, (rec) => rec.year);

  const xScale = scaleLinear().domain(domainYears).range([0, w]).nice();
  const yScale = scaleLinear().domain(domainValues).range([h, 0]).nice();

  const lineGenerator = line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  const lines = Array.from(
    group(data, (rec) => rec.countryCode),
    ([key, value]) => {
      return {
        countryCode: key,
        group: value[0].group,
        countryName: value[0].countryName,
        path: lineGenerator(value),
      };
    }
  );

  const linesFSU = lines.filter(rec => rec.group === 'FSU');
  const linesFWT = lines.filter(rec => rec.group === 'FWT');
  const linesFSUB = lines.filter(rec => rec.group === 'FSU-B');

  const ticksX = [];
  const ticksY = [];
</script>

<section>
  <LineChart
    lines={linesFSU}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    title="Former USSR except Baltic states"
    chartID="lifeExpChartFSU"
  />

  <LineChart
    lines={linesFSUB}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    title="Former USSR Baltic states"
    chartID="lifeExpChartFSUB"
  />

  <LineChart
    lines={linesFWT}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    title="Former Warsaw Treaty"
    chartID="lifeExpChartFWT"
  />
</section>


<style>
  :global(#lifeExpChartFSU path) {
    stroke: #800000;
  }

  :global(#lifeExpChartFSUB path) {
    stroke: #d3543f;
  }

  :global(#lifeExpChartFWT path) {
    stroke: #ffb495;
  }
</style>