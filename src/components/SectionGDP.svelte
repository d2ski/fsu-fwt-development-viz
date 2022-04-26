<script>
  import { scaleLinear, scaleTime, extent, group } from "d3";
  import data from "$data/GDPPPC.json";
  import SlopeChart from "$components/SlopeChart.svelte";

  const padding = { t: 25, r: 125, b: 25, l: 25 };
  const w = 350 - padding.r - padding.l;
  const h = 550 - padding.t - padding.b;

  const domainYears = extent(data, (rec) => rec.year);
  const domainValues = extent(data, (rec) => rec.value);

  $: yScale = scaleLinear().domain(domainValues).range([h, 0]);

  $: xScale = scaleLinear().domain(domainYears).range([0, w]);

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

        return line;
      }
    );

    return lines.sort((a, b) => a.isActive - b.isActive);
  };

  $: linesFSU = generateLines(data, "FSU");

  const shiftLabelsFSU = {
    key: "country",
    shift: [
      ["Georgia", -4],
      ["Azerbaijan", 3],
      ["Armenia", -1.5],
      ["Ukraine", 6],
      ["Moldova", 15],
    ],
  };
</script>

<SlopeChart lines={linesFSU} {w} {h} {padding} shiftLabels={shiftLabelsFSU} />
