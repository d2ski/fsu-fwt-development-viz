<script>
  import { fade } from "svelte/transition";
  import logo from "$svg/logo.svg";
  export let isHeaderPassed;
</script>

<header class="header">
  <div class="header__logo-box">
    <div class="header__logo">
      <div class="header__logo__icon">
        <a href="https://ohmychart.com">{@html logo}</a>
      </div>
      <div class="header__logo__text">
        <a href="https://ohmychart.com">OHMYCHART!COM</a>
      </div>
    </div>
  </div>

  <div class="header__cover">
    <div class="header__cover__text-box">
      <h1>
        Economic development of the former USSR and the Warsaw Pact countries
      </h1>
    </div>
  </div>
  <div class="header__intro">
    <p>Visualizing first 30 years of the post-Soviet economy development.</p>
    <p>Which countries have performed best and worst?</p>
    <div class="arrow-down">
      {#if !isHeaderPassed}
        <span transition:fade>&darr;</span>
      {/if}
    </div>
  </div>
</header>

<style>
  .header__logo-box {
    background-color: #400000;
    height: 10vh;
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: row;
    line-height: 0;
    align-items: center;
  }

  .header__logo__text a {
    font-size: 1.5rem;
    text-transform: uppercase;
    text-decoration: none;
    font-weight: 600;
  }

  .header__logo__icon {
    width: 32px;
    margin: 0 1rem;
    display: inline-block;
    transition: 0.4s all;
  }

  .header__logo {
    display: flex;
    flex-direction: row;
    line-height: 0;
    align-items: center;
    cursor: pointer;
  }

  .header__logo a {
    fill: #ffb495;
    color: #ffb495;
    transition: 0.4s all;
  }

  .header__logo:hover a {
    fill: #fff;
    color: #fff;
  }

  .header__logo:hover .header__logo__icon {
    transform: scale(1.1);
  }

  .header__cover {
    background-image: url(cover.jpg);
    background-size: cover;
    background-position: top;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem;
  }

  .header__cover__text-box {
    max-width: 700px;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    font-weight: 600;
    color: #fff;
    text-transform: uppercase;
    text-shadow: -2px -2px 0 #400000, 2px -2px 0 #400000, -2px 2px 0 #400000,
      2px 2px 0 #400000;
  }

  .header__intro {
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.85rem;
    line-height: 3rem;
    font-weight: 400;
    text-align: center;
    padding: 0 1rem;
  }

  .arrow-down {
    font-size: 3rem;
    line-height: 3rem;
    height: 3rem;
    margin: 2rem 0;
    color: #400000;

    animation-duration: 0.65s;
    animation-name: blink;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

</style>
