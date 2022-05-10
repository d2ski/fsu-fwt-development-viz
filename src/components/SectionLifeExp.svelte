<script>
  import { scaleLinear, extent, group, line } from "d3";
  import data from "$data/LETS.json";

  import LineChart from "$components/LineChart.svelte";

  const padding = { t: 55, r: 55, b: 25, l: 55 };
  const w = 350 - padding.r - padding.l;
  const h = 450 - padding.t - padding.b;

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

  const linesFSU = lines.filter((rec) => rec.group === "FSU");
  const linesFWT = lines.filter((rec) => rec.group === "FWT");
  const linesFSUB = lines.filter((rec) => rec.group === "FSU-B");

  const highlights = [
    {
      x1: xScale(1991),
      x2: xScale(1999),
    },
  ];

  const ticksX = xScale.ticks(4).map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });
  const ticksY = yScale.ticks(4).map((d) => {
    return {
      label: d,
      y: yScale(d),
    };
  });
</script>

<section>
  <LineChart
    lines={linesFSU}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    {highlights}
    hoverKey="countryCode"
    title="Former USSR except Baltic states"
    chartID="lifeExpChartFSU"
    --line-color="#800000"
    --line-color-muted="#e0e0e0"
    --highlight-color="#ffcdd2"
  />

  <LineChart
    lines={linesFSUB}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    {highlights}
    hoverKey="countryCode"
    title="Former USSR Baltic states"
    chartID="lifeExpChartFSUB"
    --line-color="#d3543f"
    --line-color-muted="#e0e0e0"
    --highlight-color="#ffcdd2"
  />

  <LineChart
    lines={linesFWT}
    {w}
    {h}
    {padding}
    {ticksX}
    {ticksY}
    {highlights}
    hoverKey="countryCode"
    title="Former Warsaw Treaty"
    chartID="lifeExpChartFWT"
    --line-color="#ffb495"
    --line-color-muted="#e0e0e0"
    --highlight-color="#ffcdd2"
  />
</section>
