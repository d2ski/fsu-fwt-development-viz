<script>
  import { scaleLinear, extent, rollup, mean, line } from "d3";

  import data from "$data/GDPCHG.json";
  import { width as innerWidth } from "$stores/window.js";
  import { viewport } from "$actions/viewport.js";
  import DotChart from "$components/DotChart.svelte";
  import IconHScroll from "$components/IconHScroll.svelte";

  const padding = { t: 25, r: 10, b: 42, l: 50 };
  $: width = Math.min(400, $innerWidth);
  $: w = width - padding.r - padding.l;
  $: h = 350 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.value);
  const domainYears = extent(data, (rec) => rec.year);

  $: xScale = scaleLinear().range([0, w]).domain(domainYears);
  $: yScale = scaleLinear().range([h, 0]).domain(domainValues).nice();

  $: dots = data.map((rec) => ({
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

  $: lineGenerator = line()
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
  $: dotsFSU = dots.filter((dot) => dot.group === "FSU" && dot.value);
  $: meanFSU = generateMeanLine(dotsFSU);

  $: dotsFSUB = dots.filter((dot) => dot.group === "FSU-B" && dot.value);
  $: meanFSUB = generateMeanLine(dotsFSUB);

  $: dotsFWT = dots.filter((dot) => dot.group === "FWT" && dot.value);
  $: meanFWT = generateMeanLine(dotsFWT);

  $: ticksX = xScale.ticks(domainYears[1] - domainYears[0]).map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });

  $: ticksY = yScale.ticks(8).map((d) => {
    return {
      label: d === 0 ? `${d}` : `${d}%`,
      y: yScale(d),
    };
  });

  $: zeroY = yScale(0);

  let isInView = false;
</script>

<section>
  <h2 class="section__header">GDP annual growth</h2>

  <div
    class="section__charts section-scroll-h"
    use:viewport
    on:enterViewport={() => (isInView = true)}
    on:exitViewport={() => (isInView = false)}
  >
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
      title="Former Warsaw Pact"
      chartID="gdpGrowthChartFWT"
      --dot-color="#ffb495"
      --line-color="#ffb495"
      --dot-color-muted="#e0e0e0"
      --x-tick-writing-mode="vertical-lr"
      --x-tick-translate-y="10px"
    />
    <IconHScroll {isInView} />
  </div>
</section>
