<script>
  import { scaleLinear, extent, group } from "d3";
  import data from "$data/GDPPPC.json";
  import SlopeChart from "$components/SlopeChart.svelte";

  const padding = { t: 25, r: 130, b: 25, l: 60 };
  const w = 400 - padding.r - padding.l;
  const h = 550 - padding.t - padding.b;

  const domainYears = extent(data, (rec) => rec.year);
  const domainValues = extent(data, (rec) => rec.value);

  const yScale = scaleLinear().domain(domainValues).range([h, 0]).nice();
  const xScale = scaleLinear().domain(domainYears).range([0, w]);

  const generateLines = function (data) {
    const lines = [...group(data, (rec) => rec.countryCode).values()].map(
      (rec) => {
        let line = {
          country: rec[0].countryName,
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

  const lines = generateLines(data);

  const activateLines = function(lines, activeGroup) {
    const activeLines = lines.map(rec => ({
      ...rec,
      isActive: rec.group === activeGroup
    }));

    return activeLines.sort((a, b) => a.isActive - b.isActive);
  }

  const linesFSU = activateLines(lines, "FSU");
  const linesFSUB = activateLines(lines, "FSU-B");
  const linesFWT = activateLines(lines, "FWT");

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

  const ticksX = domainYears.map((d) => {
    return {
      label: d,
      x: xScale(d),
    };
  });

  const ticksY = yScale.ticks(4).map((d) => {
    return {
      label: fmtValueStr(d, 0),
      y: yScale(d),
    };
  });
</script>

<section>
  <SlopeChart
    lines={linesFSU}
    {w}
    {h}
    {padding}
    {shiftLabels}
    {ticksX}
    {ticksY}
    {fmtValueStr}
    title="Former USSR except Baltic states"
    chartID="GdpChartFSU"
    --line-color="#e0e0e0"
    --line-color-active="#800000"
    --label-color="#e0e0e0"
    --label-color-active="#212121"
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
    title="Former USSR Baltic states"
    chartID="GdpChartFSUB"
    --line-color="#e0e0e0"
    --line-color-active="#d3543f"
    --label-color="#e0e0e0"
    --label-color-active="#212121"
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
    title="Former Warsaw Treaty"
    chartID="GdpChartFWT"
    --line-color="#e0e0e0"
    --line-color-active="#ffb495"
    --label-color="#e0e0e0"
    --label-color-active="#212121"
  />
</section>


<style>

</style>