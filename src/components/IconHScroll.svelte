<script>
  import { width as innerWidth } from "$stores/window.js";
  export let isInView;
</script>

<div
  class="section__scroll-icon"
  class:visible={isInView && $innerWidth < 1250}
>
  <span>&rarr</span>
</div>

<style>
  .section__scroll-icon {
    font-size: 2rem;
    line-height: 2rem;
    padding: 1rem 0 0 1.5rem;
    color: #9e9e9e;
    opacity: 0;
    transition: opacity 1s;
    text-align: left;
  }

  .section__scroll-icon span {
    animation-duration: 0.65s;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .visible {
    opacity: 1;
  }
</style>
