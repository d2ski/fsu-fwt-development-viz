<script>
    import BaseChart from "$components/BaseChart.svelte";
  
    export let chartID;
    export let w;
    export let h;
    export let padding;
  
    export let lines;
  
    export let ticksX;
    export let ticksY;
    export let title = "";
  </script>

<BaseChart {w} {h} {padding} {ticksX} {ticksY} {title} {chartID} >
    <g slot="chart">
        {#each lines as {path}}

        <path d={path} />
            
        {/each}
    </g>
</BaseChart>

<style>
    path {
		stroke: #212121;
		stroke-width: 2px;
		fill: none;
    }
</style>