<script>
  import { width as innerWidth} from "$stores/window.js";
  import { scaleLinear, extent, group } from "d3";
  import data from "$data/GDPPPC.json";

  // import { width as windowWidth } from "$stores/window.js";
  import SlopeChart from "$components/SlopeChart.svelte";

  const padding = { t: 25, r: 105, b: 25, l: 50 };
  $: width = Math.min(400, $innerWidth);
  $: w = width - padding.r - padding.l;
  $: h = 550 - padding.t - padding.b; // 550

  const domainYears = extent(data, (rec) => rec.year);
  const domainValues = extent(data, (rec) => rec.value);

  $: yScale = scaleLinear().domain(domainValues).range([h, 0]).nice();
  $: xScale = scaleLinear().domain(domainYears).range([0, w]);

  const generateLines = function (data, xScale, yScale) {
    const lines = [...group(data, (rec) => rec.countryCode).values()].map(
      (rec) => {
        let line = {
          country: rec[0].countryName,
          countryCode: rec[0].countryCode,
          group: rec[0].group,
          pctChange: rec[0].pctChange,
        };

        let [first, last] = rec[0].year < rec[1].year ? [0, 1] : [1, 0];
        line.x1 = xScale(rec[first].year);
        line.x2 = xScale(rec[last].year);
        line.y1 = yScale(rec[first].value);
        line.y2 = yScale(rec[last].value);
        line.value1 = rec[first].value;
        line.value2 = rec[last].value;

        return line;
      }
    );

    return lines.sort((a, b) => a.isActive - b.isActive);
  };

  $: lines = generateLines(data, xScale, yScale);

  const activateLines = function (lines, activeGroup) {
    const activeLines = lines.map((rec) => ({
      ...rec,
      isActive: rec.group === activeGroup,
    }));

    return activeLines.sort((a, b) => a.isActive - b.isActive);
  };

  $: linesFSU = activateLines(lines, "FSU");
  $: linesFSUB = activateLines(lines, "FSU-B");
  $: linesFWT = activateLines(lines, "FWT");

  const shiftLabels = {
    key: "country",
    shift: [
      ["Georgia", -5],
      ["Azerbaijan", 2],
      ["Armenia", -1],
      ["Ukraine", 7],
      ["Moldova", 16],
      ["Hungary", -3],
      ["Slovakia", 2],
    ],
  };

  const fmtValueStr = function (value, round = 1) {
    if (value === 0) return "0";
    return `$${(value / 1000).toFixed(round)}k`;
  };

  $: ticksX = domainYears.map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });

  $: ticksY = yScale.ticks(4).map((d) => {
    return {
      label: fmtValueStr(d, 0),
      y: yScale(d),
    };
  });

  const referenceLine = {
    key: "countryCode",
    value: "EUU",
  };
</script>

<section>
  <h2 class="section__header">GDP per capita</h2>

  <div class="section__charts section-scroll-h">
    <SlopeChart
      lines={linesFSU}
      {w}
      {h}
      {padding}
      {shiftLabels}
      {ticksX}
      {ticksY}
      {fmtValueStr}
      {referenceLine}
      title="Former USSR except Baltic states"
      chartID="GdpChartFSU"
      --line-color="#e0e0e0"
      --line-color-active="#800000"
      --line-color-reference="#212121"
      --label-color="#e0e0e0"
      --label-color-active="#212121"
      --label-color-reference="#212121"
    />
    <SlopeChart
      lines={linesFSUB}
      {w}
      {h}
      {padding}
      {shiftLabels}
      {ticksX}
      {ticksY}
      {fmtValueStr}
      {referenceLine}
      title="Former USSR Baltic states"
      chartID="GdpChartFSUB"
      --line-color="#e0e0e0"
      --line-color-active="#d3543f"
      --line-color-reference="#212121"
      --label-color="#e0e0e0"
      --label-color-active="#212121"
      --label-color-reference="#212121"
    />
    <SlopeChart
      lines={linesFWT}
      {w}
      {h}
      {padding}
      {shiftLabels}
      {ticksX}
      {ticksY}
      {fmtValueStr}
      {referenceLine}
      title="Former Warsaw Treaty"
      chartID="GdpChartFWT"
      --line-color="#e0e0e0"
      --line-color-active="#ffb495"
      --line-color-reference="#212121"
      --label-color="#e0e0e0"
      --label-color-active="#212121"
      --label-color-reference="#212121"
    />
  </div>
</section>
