<script>
  import { scaleLinear, extent, rollup, mean, line } from "d3";

  import data from "$data/GDPCHG.json";
  import DotChart from "$components/DotChart.svelte";

  const padding = { t: 25, r: 10, b: 42, l: 50 };
  const w = 400 - padding.r - padding.l;
  const h = 350 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.value);
  const domainYears = extent(data, (rec) => rec.year);

  const xScale = scaleLinear().range([0, w]).domain(domainYears);
  const yScale = scaleLinear().range([h, 0]).domain(domainValues).nice();

  const dots = data.map((rec) => ({
    cx: xScale(rec.year),
    cy: yScale(rec.value),
    group: rec.group,
    countryName: rec.countryName,
    countryCode: rec.countryCode,
    value: rec.value,
    year: rec.year,
  }));

  // Dot radius
  const r = 4;

  const lineGenerator = line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  const generateMeanLine = function (dots) {
    const means = rollup(
      dots,
      (v) => mean(v, (d) => d.value),
      (dot) => dot.year
    );

    return lineGenerator(
      Array.from(means, ([year, value]) => ({
        year,
        value,
      }))
    );
  };

  // Generate charts data
  const dotsFSU = dots.filter((dot) => dot.group === "FSU" && dot.value);
  const meanFSU = generateMeanLine(dotsFSU);

  const dotsFSUB = dots.filter((dot) => dot.group === "FSU-B" && dot.value);
  const meanFSUB = generateMeanLine(dotsFSUB);

  const dotsFWT = dots.filter((dot) => dot.group === "FWT" && dot.value);
  const meanFWT = generateMeanLine(dotsFWT);

  const ticksX = xScale.ticks(domainYears[1] - domainYears[0]).map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });

  const ticksY = yScale.ticks(8).map((d) => {
    return {
      label: d === 0 ? `${d}` : `${d}%`,
      y: yScale(d),
    };
  });

  const zeroY = yScale(0);
</script>

<section>
  <h2 class="section__header">GDP annual growth</h2>

  <div class="section__charts section-scroll-h">
    <DotChart
      dots={dotsFSU}
      line={meanFSU}
      {w}
      {h}
      {padding}
      {ticksX}
      {ticksY}
      {r}
      {zeroY}
      hoverKey="countryCode"
      title="Former USSR except Baltic states"
      chartID="gdpGrowthChartFSU"
      --dot-color="#800000"
      --line-color="#800000"
      --dot-color-muted="#e0e0e0"
      --x-tick-writing-mode="vertical-lr"
      --x-tick-translate-y="10px"
    />

    <DotChart
      dots={dotsFSUB}
      line={meanFSUB}
      {w}
      {h}
      {padding}
      {ticksX}
      {ticksY}
      {r}
      {zeroY}
      hoverKey="countryCode"
      title="Former USSR Baltic states"
      chartID="gdpGrowthChartFSUB"
      --dot-color="#d3543f"
      --line-color="#d3543f"
      --dot-color-muted="#e0e0e0"
      --x-tick-writing-mode="vertical-lr"
      --x-tick-translate-y="10px"
    />

    <DotChart
      dots={dotsFWT}
      line={meanFWT}
      {w}
      {h}
      {padding}
      {ticksX}
      {ticksY}
      {r}
      {zeroY}
      hoverKey="countryCode"
      title="Former Warsaw Treaty"
      chartID="gdpGrowthChartFWT"
      --dot-color="#ffb495"
      --line-color="#ffb495"
      --dot-color-muted="#e0e0e0"
      --x-tick-writing-mode="vertical-lr"
      --x-tick-translate-y="10px"
    />
  </div>
</section>
