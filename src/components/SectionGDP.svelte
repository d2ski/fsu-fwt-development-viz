<script>
  import { scaleLinear, scaleTime, extent, group } from "d3";
  import data from "$data/GDPPPC.json";
  import SlopeChart from "$components/SlopeChart.svelte";

  const padding = { t: 25, r: 100, b: 25, l: 25 };
  const w = 350 - padding.r - padding.l;
  const h = 550 - padding.t - padding.b;

  const domainYears = extent(data, (rec) => rec.year);
  const domainValues = extent(data, (rec) => rec.value);

  $: yScale = scaleLinear()
    .domain(domainValues)
    .range([h, 0]);

  $: xScale = scaleLinear()
    .domain(domainYears)
    .range([0, w]);

  const generateLines = function (data, activeGroup) {
    const lines = [...group(data, (rec) => rec.countryCode).values()].map(
      (rec) => {
        let line = {
          country: rec[0].countryName,
          isActive: rec[0].group === activeGroup,
        };

        if (rec[0].year < rec[1].year) {
          line.x1 = xScale(rec[0].year);
          line.x2 = xScale(rec[1].year);
          line.y1 = yScale(rec[0].value);
          line.y2 = yScale(rec[1].value);
        } else {
          line.x1 = xScale(rec[1].year);
          line.x2 = xScale(rec[0].year);
          line.y1 = yScale(rec[1].value);
          line.y2 = yScale(rec[0].value);
        }

        return line;
      }
    );

    return lines.sort( (a, b) => a.isActive - b.isActive);
  };

  $: linesFSU = generateLines(data, 'FSU');

</script>

<SlopeChart lines={linesFSU} {w} {h} {padding} />
