<script>
  export let tooltip;

  const offX = -25;
  const offY = 47
</script>

{#if tooltip.show}
  <div class="chart__tooltip" style:transform="{`translate(${tooltip.x + offX}px, ${tooltip.y + offY}px)`}">
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
    color: #fff;
    width: 11rem;
    height: 4rem;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .chart__tooltip__text {
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
</style>
