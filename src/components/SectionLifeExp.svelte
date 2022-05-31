<script>
  import { scaleLinear, extent, group, line } from "d3";
  import data from "$data/LETS.json";
  import { viewport } from "$actions/viewport.js";
  import { width as innerWidth } from "$stores/window.js";
  import LineChart from "$components/LineChart.svelte";
  import IconHScroll from "$components/IconHScroll.svelte";

  const padding = { t: 25, r: 105, b: 25, l: 40 };
  $: width = Math.min(400, $innerWidth);
  $: w = width - padding.r - padding.l;
  $: h = 450 - padding.t - padding.b;

  const domainValues = extent(data, (rec) => rec.value);
  const domainYears = extent(data, (rec) => rec.year);

  $: xScale = scaleLinear().domain(domainYears).range([0, w]);
  $: yScale = scaleLinear().domain(domainValues).range([h, 0]).nice();

  $: lineGenerator = line()
    .x((d) => xScale(d.year))
    .y((d) => yScale(d.value));

  $: lines = Array.from(
    group(data, (rec) => rec.countryCode),
    ([key, value]) => {
      return {
        countryCode: key,
        group: value[0].group,
        countryName: value[0].countryName,
        y: yScale(value[value.length - 1].value),
        valueStart: value[0].value,
        valueEnd: value[value.length - 1].value,
        path: lineGenerator(value),
      };
    }
  );

  $: linesFSU = lines.filter(
    (rec) => rec.group === "FSU" || rec.group === "EUU"
  );
  $: linesFWT = lines.filter(
    (rec) => rec.group === "FWT" || rec.group === "EUU"
  );
  $: linesFSUB = lines.filter(
    (rec) => rec.group === "FSU-B" || rec.group === "EUU"
  );

  $: highlights = [
    {
      x1: xScale(1991),
      x2: xScale(1999),
      label: { content: "1990s crisis", h: 0.1 },
    },
  ];

  const shiftLabels = {
    key: "countryName",
    shift: {
      Georgia: 5,
      Azerbaijan: 1,
      Moldova: -7,
      Uzbekistan: 0,
      Kyrgyzstan: 9,
      Kazakhstan: 13,
      Russia: 22,
      Tajikistan: 32,
      Ukraine: 41,
      Turkmenistan: 5,
      Lithuania: 5,
      Slovakia: -2,
      Poland: 5,
    },
  };

  $: ticksX = [1991, 2000, 2010, 2020].map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });
  $: ticksY = yScale.ticks(4).map((d) => {
    return {
      label: d,
      y: yScale(d),
    };
  });

  const referenceLine = {
    key: "countryCode",
    value: "EUU",
  };

  let isInView = false;
</script>

<section>
  <h2 class="section__header">Life expectancy at birth</h2>

  <div class="section__content">
    <p>
      Soon after the USSR had collapsed former USSR countries
      including Baltic states faced a
      demographic crisis. Life expectancy in most of the countries dropped
      significantly. But the crisis didn't affect
      former Warsaw Pact countries so much, except
      Romania and Bulgaria.
    </p>
    <p>
      30 years after former Warsaw Pact countries and Baltic states are ahead of
      other ex-USSR countries by life expectancy levels.
    </p>
  </div>

  <div
    class="section__charts section-scroll-h"
    use:viewport
    on:enterViewport={() => (isInView = true)}
    on:exitViewport={() => (isInView = false)}
  >
    <LineChart
      lines={linesFSU}
      {w}
      {h}
      {padding}
      {ticksX}
      {ticksY}
      {highlights}
      {shiftLabels}
      {referenceLine}
      hoverKey="countryCode"
      title="Former USSR except Baltic states"
      chartID="lifeExpChartFSU"
      --line-color="#800000"
      --line-color-muted="#e0e0e0"
      --line-color-reference="#212121"
      --label-color-reference="#212121"
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
      {shiftLabels}
      {referenceLine}
      hoverKey="countryCode"
      title="Former USSR Baltic states"
      chartID="lifeExpChartFSUB"
      --line-color="#d3543f"
      --line-color-muted="#e0e0e0"
      --line-color-reference="#212121"
      --label-color-reference="#212121"
      --highlight-color="#ffcdd2"
    />

    <LineChart
      lines={linesFWT}
      {w}
      {h}
      {padding}
      {ticksX}
      {ticksY}
      {shiftLabels}
      {referenceLine}
      hoverKey="countryCode"
      title="Former Warsaw Treaty"
      chartID="lifeExpChartFWT"
      --line-color="#ffb495"
      --line-color-muted="#e0e0e0"
      --line-color-reference="#212121"
      --label-color-reference="#212121"
      --highlight-color="#ffcdd2"
    />

    <IconHScroll {isInView} />
  </div>
</section>
