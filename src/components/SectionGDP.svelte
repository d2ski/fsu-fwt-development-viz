<script>
  import { scaleLinear, scaleTime, extent, group } from "d3";
  import data from "$data/GDPPPC.json";
  import SlopeChart from "$components/SlopeChart.svelte";

  const padding = { t: 25, r: 130, b: 25, l: 60 };
  const w = 350 - padding.r - padding.l;
  const h = 550 - padding.t - padding.b;

  const domainYears = extent(data, (rec) => rec.year);
  const domainValues = extent(data, (rec) => rec.value);

  const yScale = scaleLinear().domain(domainValues).range([h, 0]).nice();
  const xScale = scaleLinear().domain(domainYears).range([0, w]);

  const generateLines = function (data, activeGroup) {
    const lines = [...group(data, (rec) => rec.countryCode).values()].map(
      (rec) => {
        let line = {
          country: rec[0].countryName,
          isActive: rec[0].group === activeGroup,
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

  const linesFSU = generateLines(data, "FSU");
  const linesFSUB = generateLines(data, "FSU-B");
  const linesFWT = generateLines(data, "FWT");

  const shiftLabels = {
    key: "country",
    shift: [
      ["Georgia", -5],
      ["Azerbaijan", 2],
      ["Armenia", -1],
      ["Ukraine", 7],
      ["Moldova", 16],
      ["Hungary", -3],
      ["Slovak Republic", 2],
    ],
  };

  const ticksX = domainYears.map(d => {
    return {
      label: d,
      x: xScale(d)
    }
  });

  const ticksY = yScale.ticks(4).map(d => {
    return {
      label: d,
      y: yScale(d)
    }
  });

</script>

<section>
  <SlopeChart lines={linesFSU} {w} {h} {padding} shiftLabels={shiftLabels} {ticksX} {ticksY} title="Former USSR except Baltic states"/>
  <SlopeChart lines={linesFSUB} {w} {h} {padding} shiftLabels={shiftLabels} {ticksX} {ticksY} title="Former USSR, Baltic states only"/>
  <SlopeChart lines={linesFWT} {w} {h} {padding} shiftLabels={shiftLabels} {ticksX} {ticksY} title="Former Warsaw Treaty"/>
</section>

<style>
  section {
    padding: 3rem 0;
  }
</style>