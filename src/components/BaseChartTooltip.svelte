<script>
  export let tooltip;
  export let chartWidth = 400;

  const offXLeft = -25;
  const offXRight = -95;
  const offYLeft = 45;
  const offYRight = -30;

  let tooltipWidth;
  $: translateX = tooltip.x + offXLeft;
  $: translateY = tooltip.y + offYLeft;

  $: if(tooltip.x + offXLeft + tooltipWidth > chartWidth) {
    translateX = tooltip.x + offXRight;
    translateY = tooltip.y + offYRight;
  }

</script>

{#if tooltip.show}
  <div
    bind:clientWidth={tooltipWidth}
    class="chart__tooltip"
    style:transform={`translate(${translateX}px, ${translateY}px)`}
  > 
    {#each tooltip.content as paragraph}
      <p class="chart__tooltip__text">{paragraph}</p>
    {/each}
  </div>
{/if}

<style>
  .chart__tooltip {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(33, 33, 33, 0.65);
    width: 11rem;
    height: 4rem;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }

  p.chart__tooltip__text {
    font-size: 1.25rem;
    line-height: 1.5rem;
    color: #fff;
    max-width: 11rem;
    text-align: center;
    margin: 0;
  }
</style>
